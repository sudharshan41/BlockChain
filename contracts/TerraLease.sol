// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TerraLease {
    struct Land {
        address landlord;
        uint256 price; // Price per month in wei
        string description;
        string imageUrl;
        bool isRented;
    }

    mapping(uint256 => Land) public lands;
    uint256 public landCount;

    struct RentalAgreement {
        uint256 landId;
        address tenant;
        uint256 rentalStart;
        uint256 rentalEnd;
        uint256 agreedPrice; // Price per month in wei
        bool isActive;
    }

    mapping(uint256 => RentalAgreement) public rentalAgreements;
    uint256 public agreementCount;

    // Events
    event LandListed(uint256 landId, address landlord, uint256 price, string description, string imageUrl);
    event LandRented(uint256 agreementId, uint256 landId, address tenant, uint256 rentalStart, uint256 rentalEnd, uint256 agreedPrice);
    event RentalAgreementEnded(uint256 agreementId);

    // Modifier to check if the caller is the landlord of the land
    modifier onlyLandlord(uint256 _landId) {
        require(lands[_landId].landlord == msg.sender, "Only landlord can perform this action");
        _;
    }

    // Modifier to check if the rental agreement is active
    modifier onlyActiveAgreement(uint256 _agreementId) {
        require(rentalAgreements[_agreementId].isActive, "Rental agreement is not active");
        _;
    }

    // Function to list land for rent
    function listLand(uint256 _price, string memory _description, string memory _imageUrl) public {
        require(_price > 0, "Price must be greater than zero");
        landCount++;
        lands[landCount] = Land(msg.sender, _price, _description, _imageUrl, false);
        emit LandListed(landCount, msg.sender, _price, _description, _imageUrl);
    }

    // Function to update the price of the land
    function updateLandPrice(uint256 _landId, uint256 _newPrice) public onlyLandlord(_landId) {
        require(_newPrice > 0, "Price must be greater than zero");
        lands[_landId].price = _newPrice;
    }

    // Function to rent land
    function rentLand(uint256 _landId, uint256 _rentalStart, uint256 _rentalEnd) payable public {
        require(!lands[_landId].isRented, "Land is already rented");
        require(_rentalStart < _rentalEnd, "Rental start must be before rental end");
        require(msg.value >= lands[_landId].price, "Insufficient payment");

        agreementCount++;
        rentalAgreements[agreementCount] = RentalAgreement(_landId, msg.sender, _rentalStart, _rentalEnd, lands[_landId].price, true);
        lands[_landId].isRented = true;
        emit LandRented(agreementCount, _landId, msg.sender, _rentalStart, _rentalEnd, lands[_landId].price);
    }

    // Function to end rental agreement
    function endRentalAgreement(uint256 _agreementId) public onlyLandlord(rentalAgreements[_agreementId].landId) onlyActiveAgreement(_agreementId) {
        uint256 landId = rentalAgreements[_agreementId].landId;
        lands[landId].isRented = false;
        rentalAgreements[_agreementId].isActive = false;
        emit RentalAgreementEnded(_agreementId);
    }

    // Function to withdraw funds
    function withdrawFunds() public onlyLandlord(1) {
        // This is a simplified version, in a real-world scenario, you'd want to withdraw funds related to specific land ID
        payable(msg.sender).transfer(address(this).balance);
    }

    // Function to get land details
    function getLandDetails(uint256 _landId) public view returns (address landlord, uint256 price, string memory description, string memory imageUrl, bool isRented) {
        Land memory land = lands[_landId];
        return (land.landlord, land.price, land.description, land.imageUrl, land.isRented);
    }

    // Function to get rental agreement details
    function getRentalAgreementDetails(uint256 _agreementId) public view returns (uint256 landId, address tenant, uint256 rentalStart, uint256 rentalEnd, uint256 agreedPrice, bool isActive) {
        RentalAgreement memory agreement = rentalAgreements[_agreementId];
        return (agreement.landId, agreement.tenant, agreement.rentalStart, agreement.rentalEnd, agreement.agreedPrice, agreement.isActive);
    }
}
