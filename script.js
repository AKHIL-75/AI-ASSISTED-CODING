// ========================================
// DOM ELEMENT REFERENCES
// ========================================

// Get Started Button
const getStartedBtn = document.getElementById('getStartedBtn');

// Contact Form Elements
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

// List Management Elements
const productList = document.getElementById('productList');
const addItemBtn = document.getElementById('addItemBtn');
const removeItemBtn = document.getElementById('removeItemBtn');

// Modal Elements
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const acceptModalBtn = document.getElementById('acceptModalBtn');

// ========================================
// 1. CALL-TO-ACTION BUTTON FUNCTIONALITY
// ========================================

/**
 * Event listener for the "Get Started" button
 * Shows a thank you message when clicked without page reload
 */
getStartedBtn.addEventListener('click', function() {
    // Show alert thanking the user
    alert('Thank you for your interest! We\'re excited to have you on board.');
});

// ========================================
// 2. CONTACT FORM VALIDATION
// ========================================

/**
 * Validates that a field is not empty
 * @param {string} value - The input value to validate
 * @returns {boolean} - True if value is not empty after trimming
 */
function isFieldEmpty(value) {
    return value.trim() === '';
}

/**
 * Validates email format using regular expression
 * Checks for basic email pattern: something@something.something
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if email format is valid
 */
function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Clears all error messages from the form
 */
function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');
}

/**
 * Validates the entire contact form
 * Checks each field and displays inline error messages if invalid
 * @returns {boolean} - True if form is valid, false otherwise
 */
function validateContactForm() {
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // Validate Name field
    if (isFieldEmpty(nameInput.value)) {
        nameError.textContent = 'Name is required.';
        nameInput.classList.add('error');
        isValid = false;
    }
    
    // Validate Email field
    if (isFieldEmpty(emailInput.value)) {
        emailError.textContent = 'Email is required.';
        emailInput.classList.add('error');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('error');
        isValid = false;
    }
    
    // Validate Message field
    if (isFieldEmpty(messageInput.value)) {
        messageError.textContent = 'Message is required.';
        messageInput.classList.add('error');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Displays a success message and resets the form
 */
function showSuccessMessage() {
    successMessage.textContent = '✓ Thank you! Your message has been sent successfully.';
    // Clear form inputs
    contactForm.reset();
    
    // Clear success message after 5 seconds
    setTimeout(function() {
        successMessage.textContent = '';
    }, 5000);
}

/**
 * Event listener for form submission
 * Validates form before allowing submission
 * Prevents default form submission behavior
 */
contactForm.addEventListener('submit', function(event) {
    // Prevent the form from actually submitting to a server
    event.preventDefault();
    
    // Validate the form
    if (validateContactForm()) {
        // If form is valid, show success message
        showSuccessMessage();
    }
});

/**
 * Real-time validation as user types in the Name field
 * Clears error when user starts correcting the field
 */
nameInput.addEventListener('input', function() {
    if (!isFieldEmpty(this.value)) {
        nameError.textContent = '';
        nameInput.classList.remove('error');
    }
});

/**
 * Real-time validation as user types in the Email field
 * Validates email format in real-time
 */
emailInput.addEventListener('input', function() {
    if (!isFieldEmpty(this.value) && isValidEmail(this.value)) {
        emailError.textContent = '';
        emailInput.classList.remove('error');
    }
});

/**
 * Real-time validation as user types in the Message field
 * Clears error when user starts typing
 */
messageInput.addEventListener('input', function() {
    if (!isFieldEmpty(this.value)) {
        messageError.textContent = '';
        messageInput.classList.remove('error');
    }
});

// ========================================
// 3. DYNAMIC LIST MANAGEMENT
// ========================================

let itemCount = 4; // Track number of items for naming purposes

/**
 * Adds a new item to the product list
 * Creates a new <li> element and appends it to the list
 * Uses animation for visual feedback
 */
function addItem() {
    itemCount++;
    
    // Create new list item element
    const newItem = document.createElement('li');
    
    // Set the text content for the new item
    newItem.textContent = 'Service Item ' + itemCount;
    
    // Add the new item to the product list
    productList.appendChild(newItem);
    
    // The CSS animation 'slideIn' will be automatically applied due to the class
}

/**
 * Removes the last item from the product list
 * Only removes if there's more than one item
 * Provides user feedback if list is empty
 */
function removeItem() {
    // Get all list items
    const items = productList.querySelectorAll('li');
    
    // Check if there are items to remove (keep at least one)
    if (items.length > 0) {
        // Remove the last item from the list
        items[items.length - 1].remove();
    } else {
        // Show message if trying to remove from empty list
        alert('No items to remove!');
    }
}

/**
 * Event listener for "Add Item" button
 * Calls addItem function when clicked
 */
addItemBtn.addEventListener('click', addItem);

/**
 * Event listener for "Remove Item" button
 * Calls removeItem function when clicked
 */
removeItemBtn.addEventListener('click', removeItem);

// ========================================
// 4. MODAL POPUP FUNCTIONALITY
// ========================================

/**
 * Opens the modal popup
 * Adds the 'active' class to show the modal overlay
 */
function openModal() {
    modalOverlay.classList.add('active');
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the modal popup
 * Removes the 'active' class to hide the modal overlay
 */
function closeModal() {
    modalOverlay.classList.remove('active');
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

/**
 * Event listener for "Open Modal" button
 * Opens the modal when clicked
 */
openModalBtn.addEventListener('click', openModal);

/**
 * Event listener for close button (X) inside the modal
 * Closes the modal when clicked
 */
closeModalBtn.addEventListener('click', closeModal);

/**
 * Event listener for modal overlay background
 * Closes the modal when user clicks outside the modal box
 * Only triggers if the click is directly on the overlay, not on the modal itself
 */
modalOverlay.addEventListener('click', function(event) {
    // Check if the click was on the overlay background, not the modal content
    if (event.target === modalOverlay) {
        closeModal();
    }
});

/**
 * Event listener for "Accept" button inside modal
 * Closes the modal when user clicks accept
 */
acceptModalBtn.addEventListener('click', closeModal);

/**
 * Keyboard accessibility - close modal when Escape key is pressed
 * Improves user experience and accessibility
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
