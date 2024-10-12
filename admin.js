document.addEventListener('DOMContentLoaded', function () {
    const propertyList = document.getElementById('property-list');
    const addListingForm = document.getElementById('add-listing-form');

    // Function to render listings to the page
    function renderListings(listings) {
        propertyList.innerHTML = ''; // Clear existing listings
        listings.forEach(listing => {
            const listingElement = document.createElement('div');
            listingElement.className = 'listing-item';
            listingElement.innerHTML = `
                <img src="${listing.image}" alt="${listing.name}" width="100">
                <h3>${listing.name}</h3>
                <p>${listing.price} - ${listing.address}</p>
                <button onclick="editListing(${listing.id})">Edit</button>
                <button onclick="deleteListing(${listing.id})">Delete</button>
            `;
            propertyList.appendChild(listingElement);
        });
    }

    // Fetch listings from the server
    function fetchListings() {
        fetch('http://localhost:3000/listings')
            .then(response => response.json())
            .then(data => {
                renderListings(data); // Render the listings from the server
            })
            .catch(error => {
                console.error('Error fetching listings:', error);
            });
    }

    // Handling the addition of a new listing
    addListingForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get the form values
        const newName = document.getElementById('property-name').value;
        const newPrice = document.getElementById('property-price').value;
        const newAddress = document.getElementById('property-address').value;
        const newImage = document.getElementById('property-image').value;

        // Create new listing object
        const newListing = {
            name: newName,
            price: newPrice,
            address: newAddress,
            image: newImage
        };

        // Send new listing data to the server using POST
        fetch('http://localhost:3000/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newListing)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Listing added:', data);
            fetchListings(); // Re-fetch and display the updated listings
        })
        .catch(error => {
            console.error('Error adding listing:', error);
        });

        addListingForm.reset(); // Reset the form fields
    });

    // Initial fetch of listings when the page loads
    fetchListings();
});
