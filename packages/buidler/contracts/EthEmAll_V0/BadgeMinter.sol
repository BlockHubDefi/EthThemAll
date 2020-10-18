// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import '@nomiclabs/buidler/console.sol';
// import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';
// import '@openzeppelin/contracts/cryptography/MerkleProof.sol';

contract BadgeMinter is
    ERC721 , AccessControl
{
    /// @dev Roles
    // To-do: add new roles here if necessary
    bytes32 public constant TEMPLATER_ROLE = keccak256('TEMPLATER_ROLE');
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    // Uncomment if using merkle-root verification later on: using MerkleProof for bytes32[];

    Counters.Counter private _badgeIds;
    Counters.Counter private _templateIds;

    struct BadgeTemplate {
        string defiTribe;
        string name;
        string description;
        string image;
    }

    mapping(uint256 => BadgeTemplate) public BadgeTemplates;
    mapping(uint256 => uint256) public badgeTemplateId;
    mapping(uint256 => uint256) public templateBadgeQuantity;
    mapping(uint256 => mapping(address => bool)) public badgeRedeemed;

    event TemplateCreated(uint256 templateId, string defiTribe, string name, string description, string image);
    event TemplateUpdated(uint256 templateId, string defiTribe, string name, string description, string image);

    modifier onlyAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            'Caller must be an authorized Admin.'
        );
        _;
    }

    modifier onlyTemplaters() {
        require(
            hasRole(TEMPLATER_ROLE, msg.sender),
            'Caller must be an authorized Templater.'
        );
        _;
    }

    constructor() public ERC721('EthEmAll', 'EEA') {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(TEMPLATER_ROLE, msg.sender);
        // Storing Badge metadata on IPFS
        _setBaseURI('ipfs://ipfs/');
    }

    /// @notice Set the baseURI
    /// @dev Update the baseURI specified in the constructor
    /// @param _newBaseURI New baseURI
    /// @return True if the new baseURI is set
    function setBaseURI(string memory _newBaseURI)
        public
        onlyAdmin
        returns (bool)
    {
        _setBaseURI(_newBaseURI);
        return true;
    }

    /// @notice Fallback function
    /// @dev Added not payable to revert transactions not matching any other function which send value
    fallback() external {
        revert();
    }

    function redeemBadge(address _to, string memory _badgeURI, uint256 _templateId)
        public
        onlyAdmin
        returns (bool)
    {
        require(
            _templateIds.current() > _templateId,
            'Template id does not exist.'
        );
        require(
            !badgeRedeemed[_templateId][_to],
            'The caller has already redeemed the badge for this user address.'
        );
        // To-do: Badge eligibility verification with merkle-trees if required . . .
        badgeTemplateId[_badgeIds.current()] = _templateId;
        templateBadgeQuantity[_templateId] = templateBadgeQuantity[_templateId]
            .add(1);
        badgeRedeemed[_templateId][_to] = true;
        require(_mintBadge(_to, _badgeURI));
        return true;
    }

    // Return the quantity of minted badges for a specific template Id
    function getTemplateBadgeQuantity(uint256 _templateId)
        public
        view
        returns (uint256)
    {
        require(
            _templateIds.current() > _templateId,
            'Template id does not exist.'
        );
        return templateBadgeQuantity[_templateId];
    }

    // Return the template Id associated with the tokenId
    function getBadgeAssociatedTemplateId(uint256 _badgeId)
        public
        view
        returns (uint256)
    {
        require(_badgeIds.current() > _badgeId, 'Badge id does not exist.');
        return badgeTemplateId[_badgeId];
    }

    function _mintBadge(address _to, string memory _badgeURI)
        private
        returns (bool)
    {
        uint256 newBadgeId = _badgeIds.current();
        _mint(_to, newBadgeId);
        // Will temporary store the IPFS hash as a string memory, but will later store it as 2 separate hashes to save gas
        _setTokenURI(newBadgeId, _badgeURI);
        _badgeIds.increment();
        return true;
    }

    function addTemplate(
        string memory _defiTribe,
        string memory _name,
        string memory _description,
        string memory _image
    ) public onlyTemplaters returns (bool) {
        BadgeTemplates[_templateIds.current()].defiTribe = _defiTribe;
        BadgeTemplates[_templateIds.current()].name = _name;
        BadgeTemplates[_templateIds.current()].image = _image;
        BadgeTemplates[_templateIds.current()].description = _description;
        _templateIds.increment();
        emit TemplateCreated(_templateIds.current().sub(1), _defiTribe, _name, _description, _image);
        return true;
    }

    function updateTemplate(
        uint256 _templateId,
        string memory _defiTribe,
        string memory _name,
        string memory _description,
        string memory _image
    ) public onlyTemplaters returns (bool) {
        require(
            _templateIds.current() > _templateId,
            'Template id does not exist.'
        );
        BadgeTemplates[_templateId].defiTribe = _defiTribe;
        BadgeTemplates[_templateId].name = _name;
        BadgeTemplates[_templateId].image = _image;
        BadgeTemplates[_templateId].description = _description;
        emit TemplateUpdated(_templateId, _defiTribe, _name, _description, _image);
        return true;
    }

    function getTemplate(uint256 _templateId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(
            _templateIds.current() > _templateId,
            'Template id does not exist.'
        );
        return (
            BadgeTemplates[_templateId].defiTribe,
            BadgeTemplates[_templateId].name,
            BadgeTemplates[_templateId].image,
            BadgeTemplates[_templateId].description
        );
    }

    // Overriding transfer function for NTNFT
    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal override {
        require(false, 'BadgeMinter: badge transfer disabled for NTNFTs.');
        super._transfer(_from, _to, _tokenId);
    }

    function addTemplater(address _address) public onlyAdmin returns (bool) {
        require(
            !hasRole(TEMPLATER_ROLE, _address),
            'User address is already a Templater'
        );
        grantRole(TEMPLATER_ROLE, _address);
        return true;
    }

    function removeTemplater(address _address) public onlyAdmin returns (bool) {
        require(
            hasRole(TEMPLATER_ROLE, _address),
            'User address is not currently a Templater'
        );
        revokeRole(TEMPLATER_ROLE, _address);
        return true;
    }

}
