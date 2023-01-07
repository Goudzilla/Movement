//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol"; 


contract MovementByOzmandium is ERC721A, Ownable{
    using Strings for uint256;

    uint256 public mintPrice;
    uint256 amountForTeam;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    bool public teamMinted = false;
    string private baseTokenUri;
    mapping(address => uint256) public walletMints;

    constructor() ERC721A('Movement by Ozmandium', 'MBO') {
        mintPrice = 0.012 ether;
        maxSupply = 205;
        maxPerWallet = 2;

    }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "Cannot be called by contract");
        _;
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }
 
    //return uri for certain token
    function tokenURI(uint256 tokenId_) public view virtual override returns (string memory) {
        require(_exists(tokenId_), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner{
        
        uint256 withdrawAmount = (address(this).balance);
        payable(0xFbDbbCaA424A00521B23f9524c266E0278154866).transfer(withdrawAmount);
        payable(msg.sender).transfer(address(this).balance);
    }

    function teamMint() external onlyOwner{
        require(!teamMinted, "Team Already Minted!");
        teamMinted = true;
        _safeMint(msg.sender, 6);
    }

    function mint(uint256 quantity_) public payable callerIsUser{
        require(isPublicMintEnabled, 'minting not enabled');
        require(totalSupply() + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');


        walletMints[msg.sender] += quantity_;
        _safeMint(msg.sender, quantity_);
    }
}