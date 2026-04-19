// ===== GLOBAL VARIABLES =====
let cart = JSON.parse(localStorage.getItem('rcode-cart')) || [];
const SHIPPING_COST = 25; // דמי משלוח קבועים - ניתן לשנות

// ===== PRODUCTS DATA =====
const products = [
    // הייטק & IT
    { 
        id: 1, 
        name: 'Code Master', 
        category: 'tech', 
        price: 149, 
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=500&fit=crop'
    },
    { 
        id: 2, 
        name: 'Developer Life', 
        category: 'tech', 
        price: 159, 
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=500&fit=crop'
    },
    { 
        id: 3, 
        name: 'Cyber Security', 
        category: 'tech', 
        price: 169, 
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=500&fit=crop'
    },
    
    // מקצועות
    { 
        id: 4, 
        name: 'עורך דין', 
        category: 'professions', 
        price: 139, 
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=500&fit=crop'
    },
    { 
        id: 5, 
        name: 'רופא', 
        category: 'professions', 
        price: 149, 
        image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=500&h=500&fit=crop'
    },
    { 
        id: 6, 
        name: 'מהנדס', 
        category: 'professions', 
        price: 139, 
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop'
    },
    
    // Kartoon
    { 
        id: 7, 
        name: 'Funny Cat', 
        category: 'kartoon', 
        price: 129, 
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop'
    },
    { 
        id: 8, 
        name: 'Cool Dog', 
        category: 'kartoon', 
        price: 119, 
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop'
    },
    { 
        id: 9, 
        name: 'Space Hero', 
        category: 'kartoon', 
        price: 139, 
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop'
    },
    
    // כללי
    { 
        id: 10, 
        name: 'Classic White', 
        category: 'general', 
        price: 99, 
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
    },
    { 
        id: 11, 
        name: 'Black Style', 
        category: 'general', 
        price: 99, 
        image: 'https://images.unsplash.com/photo-1503341338985-f1d9e5d93e55?w=500&h=500&fit=crop'
    },
    { 
        id: 12, 
        name: 'Urban Look', 
        category: 'general', 
        price: 109, 
        image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=500&fit=crop'
    },
    
    // חולצות QR לדוגמא
    { 
        id: 13, 
        name: 'QR Business Card', 
        category: 'qr', 
        price: 149, 
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop'
    },
    { 
        id: 14, 
        name: 'QR Instagram', 
        category: 'qr', 
        price: 139, 
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=500&fit=crop'
    },
    { 
        id: 15, 
        name: 'QR Website', 
        category: 'qr', 
        price: 149, 
        image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=500&h=500&fit=crop'
    }
];

const categoryNames = {
    'tech': 'הייטק & IT',
    'professions': 'מקצועות',
    'kartoon': 'Kartoon',
    'general': 'כללי',
    'qr': 'חולצות QR לדוגמא'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavigation();
    initCatalog();
    initCart();
    initCustomOrder();
    initScrollAnimations();
    initImageModal();
    updateCartUI();
});

// ===== LOADER =====
function initLoader() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    }, 1500);
}

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== CATALOG =====
function initCatalog() {
    const catalogSelect = document.getElementById('catalogSelect');
    const productsGrid = document.getElementById('productsGrid');

    function renderProducts(filter = 'all') {
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(p => p.category === filter);

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image" onclick="openImageModal('${product.image}', '${product.name}')">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-category">${categoryNames[product.category]}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">₪${product.price}</div>
                    <div class="size-label">בחר מידה:</div>
                    <div class="size-selector">
                        <button class="size-btn active" data-size="S">S</button>
                        <button class="size-btn" data-size="M">M</button>
                        <button class="size-btn" data-size="L">L</button>
                        <button class="size-btn" data-size="XL">XL</button>
                    </div>
                    <button class="add-to-cart-btn" data-id="${product.id}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 2L6 6H3L6 20H18L21 6H18L15 2H9Z" stroke-width="2"/>
                        </svg>
                        הוסף לעגלה
                    </button>
                </div>
            </div>
        `).join('');

        attachProductEvents();
    }

    function attachProductEvents() {
        // Size selection
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent image modal from opening
                e.target.closest('.size-selector').querySelectorAll('.size-btn').forEach(b => {
                    b.classList.remove('active');
                });
                e.target.classList.add('active');
            });
        });

        // Add to cart
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent image modal from opening
                const productId = parseInt(e.currentTarget.dataset.id);
                const card = e.currentTarget.closest('.product-card');
                const selectedSize = card.querySelector('.size-btn.active').dataset.size;
                addToCart(productId, selectedSize);
            });
        });
    }

    catalogSelect.addEventListener('change', (e) => {
        renderProducts(e.target.value);
    });

    // Initial render
    renderProducts();
}

// ===== CART MANAGEMENT =====
function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => 
        item.id === productId && item.size === size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: 1,
            image: product.image
        });
    }

    saveCart();
    updateCartUI();
    showToast(product.image, product.name, size);
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, size, change) {
    const item = cart.find(i => i.id === productId && i.size === size);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('rcode-cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 2L6 6H3L6 20H18L21 6H18L15 2H9Z" stroke-width="2"/>
                </svg>
                <p>העגלה שלך ריקה</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">מידה: ${item.size}</div>
                    <div class="cart-item-price">₪${item.price * item.quantity}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', -1)">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 6L6 18M6 6L18 18" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Calculate subtotal and total with shipping
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalWithShipping = cart.length > 0 ? subtotal + SHIPPING_COST : 0;
    
    // Update total price display
    if (cart.length > 0) {
        totalPrice.innerHTML = `
            <div class="price-breakdown">
                <div class="subtotal-line">
                    <span>סכום ביניים:</span>
                    <span>₪${subtotal}</span>
                </div>
                <div class="shipping-line">
                    <span>משלוח:</span>
                    <span>₪${SHIPPING_COST}</span>
                </div>
                <div class="total-line">
                    <span>סה"כ לתשלום:</span>
                    <span class="total-amount">₪${totalWithShipping}</span>
                </div>
            </div>
        `;
    } else {
        totalPrice.textContent = '₪0';
    }

    syncCartBottomPadding();
}

function initCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const sendWhatsApp = document.getElementById('sendWhatsApp');

    function syncOnResize() {
        syncCartBottomPadding();
    }

    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        syncCartBottomPadding();
    }

    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    sendWhatsApp.addEventListener('click', sendCartToWhatsApp);
    window.addEventListener('resize', syncOnResize);
}

function syncCartBottomPadding() {
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.querySelector('#cartSidebar .cart-footer');
    if (!cartItems || !cartFooter) return;

    const extra = 16; // breathing room above the footer
    const bottomSpace = Math.max(0, cartFooter.offsetHeight + extra);
    cartItems.style.paddingBottom = `${bottomSpace}px`;
    cartItems.style.scrollPaddingBottom = `${bottomSpace}px`;
}

// ===== TOAST NOTIFICATION =====
function showToast(imageUrl, productName, size) {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');

    toastIcon.innerHTML = `<img src="${imageUrl}" alt="${productName}">`;
    toastMessage.textContent = `${productName} | מידה ${size}`;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== WHATSAPP INTEGRATION =====
function sendCartToWhatsApp() {
    if (cart.length === 0) {
        alert('העגלה ריקה!');
        return;
    }

    const phoneNumber = '972584990152'; // החלף במספר שלך
    
    let message = '🛍️ *הזמנה חדשה מ-R-CODE*\n\n';
    message += '📦 *פרטי ההזמנה:*\n';
    message += '━━━━━━━━━━━━━━━\n\n';

    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   📏 מידה: ${item.size}\n`;
        message += `   🔢 כמות: ${item.quantity}\n`;
        message += `   💰 מחיר ליחידה: ₪${item.price}\n`;
        message += `   💵 סה"כ: ₪${item.price * item.quantity}\n\n`;
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalWithShipping = subtotal + SHIPPING_COST;

    message += '━━━━━━━━━━━━━━━\n';
    message += `💵 סכום ביניים: ₪${subtotal}\n`;
    message += `🚚 דמי משלוח: ₪${SHIPPING_COST}\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `💳 *סה"כ לתשלום: ₪${totalWithShipping}*\n\n`;
    message += '✨ תודה על ההזמנה!';

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}

// ===== CUSTOM ORDER FORM =====
function initCustomOrder() {
    const form = document.getElementById('customOrderForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const phoneNumber = '972584990152'; // החלף במספר שלך

        // Get form data
        const formData = {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            designType: document.getElementById('designType').value,
            shirtColor: document.getElementById('shirtColor').value,
            size: document.getElementById('shirtSize').value,
            quantity: document.getElementById('quantity').value,
            details: document.getElementById('designDetails').value,
            notes: document.getElementById('additionalNotes').value
        };

        // Design type names in Hebrew
        const designTypes = {
            'logo': 'הדפסת לוגו',
            'text': 'טקסט מותאם',
            'image': 'תמונה אישית',
            'qr': 'QR Code',
            'custom': 'עיצוב מיוחד'
        };

        // Shirt colors in Hebrew
        const colors = {
            'black': 'שחור',
            'white': 'לבן',
            'navy': 'כחול נייבי',
            'gray': 'אפור',
            'custom': 'צבע מותאם אישית'
        };

        // Build WhatsApp message
        let message = '🎨 *הזמנה מותאמת אישית - R-CODE*\n\n';
        message += '👤 *פרטי הלקוח:*\n';
        message += `שם: ${formData.name}\n`;
        message += `טלפון: ${formData.phone}\n\n`;
        
        message += '👕 *פרטי החולצה:*\n';
        message += `━━━━━━━━━━━━━━━\n`;
        message += `🎨 סוג עיצוב: ${designTypes[formData.designType]}\n`;
        message += `🎨 צבע חולצה: ${colors[formData.shirtColor]}\n`;
        message += `📏 מידה: ${formData.size}\n`;
        message += `🔢 כמות: ${formData.quantity}\n\n`;
        
        message += '📝 *פרטי העיצוב:*\n';
        message += `${formData.details}\n\n`;

        if (formData.notes) {
            message += '💬 *הערות נוספות:*\n';
            message += `${formData.notes}\n\n`;
        }

        message += '━━━━━━━━━━━━━━━\n';
        message += '✨ *נחזור אליך בהקדם עם הצעת מחיר!*';

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');

        // Reset form
        form.reset();
        
        // Show success message (using a placeholder image)
        showToast('https://via.placeholder.com/100x100/00f0ff/ffffff?text=✓', 'ההזמנה נשלחה בהצלחה', 'תודה!');
    });
}

// ===== IMAGE MODAL/LIGHTBOX =====
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    function openModal(imageSrc, imageAlt) {
        modalImage.src = imageSrc;
        modalCaption.textContent = imageAlt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Clear image after animation
        setTimeout(() => {
            modalImage.src = '';
            modalCaption.textContent = '';
        }, 300);
    }

    // Close button
    modalClose.addEventListener('click', closeModal);
    
    // Close on overlay click
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Expose function globally
    window.openImageModal = openModal;
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card, .custom-card, .contact-btn').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== EXPOSE FUNCTIONS TO GLOBAL SCOPE =====
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
