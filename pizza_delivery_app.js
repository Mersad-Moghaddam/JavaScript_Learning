// In-memory data stores
const users = [];
const menu = [
  { id: 1, name: "Margherita", price: 8.99 },
  { id: 2, name: "Pepperoni", price: 10.99 },
  { id: 3, name: "Hawaiian", price: 11.99 },
  { id: 4, name: "Veggie", price: 9.99 }
];
const orders = [];

// Helper functions
function findUser(username) {
  return users.find(u => u.username === username);
}

function authenticate(username, password) {
  const user = findUser(username);
  return user && user.password === password ? user : null;
}

// User registration
function register(username, password, address) {
  if (findUser(username)) {
    return { success: false, message: "Username already exists." };
  }
  users.push({ username, password, address });
  return { success: true, message: "Registration successful." };
}

// User login
function login(username, password) {
  const user = authenticate(username, password);
  if (user) {
    return { success: true, message: "Login successful." };
  }
  return { success: false, message: "Invalid credentials." };
}

// List menu
function listMenu() {
  return menu.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price
  }));
}

// Place order
function placeOrder(username, password, pizzaId, quantity) {
  const user = authenticate(username, password);
  if (!user) return { success: false, message: "Authentication failed." };
  const pizza = menu.find(p => p.id === pizzaId);
  if (!pizza) return { success: false, message: "Pizza not found." };
  const order = {
    id: orders.length + 1,
    user: username,
    pizza: pizza.name,
    quantity,
    total: pizza.price * quantity,
    address: user.address,
    status: "Preparing"
  };
  orders.push(order);
  return { success: true, message: "Order placed.", orderId: order.id };
}

// Track order
function trackOrder(orderId, username, password) {
  const user = authenticate(username, password);
  if (!user) return { success: false, message: "Authentication failed." };
  const order = orders.find(o => o.id === orderId && o.user === username);
  if (!order) return { success: false, message: "Order not found." };
  return { success: true, status: order.status, order };
}

// Simulate order status updates
function updateOrderStatus(orderId, status) {
  const order = orders.find(o => o.id === orderId);
  if (order) order.status = status;
}

// Example usage (uncomment to test)
/*
console.log(register("alice", "pass123", "123 Main St"));
console.log(login("alice", "pass123"));
console.log("Menu:", listMenu());
console.log(placeOrder("alice", "pass123", 2, 2));
updateOrderStatus(1, "Out for delivery");
console.log(trackOrder(1, "alice", "pass123"));
updateOrderStatus(1, "Delivered");
console.log(trackOrder(1, "alice", "pass123"));
*/

// Export functions for testing or integration
module.exports = {
  register,
  login,
  listMenu,
  placeOrder,
  trackOrder,
  updateOrderStatus
};

// CLI Interface
if (require.main === module) {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let currentUser = null;

  /**
   * Show the main menu and prompt the user to choose an option.
   * If the user is not logged in, show the registration/login menu.
   * If the user is logged in, show the menu/order tracking/logout menu.
   */
  function promptMenu() {
    console.log("\n--- Pizza Delivery App ---");
    if (!currentUser) {
      console.log("1. Register");
      console.log("2. Login");
      console.log("3. Exit");
      rl.question("Choose an option: ", answer => {
        if (answer === "1") return promptRegister();
        if (answer === "2") return promptLogin();
        if (answer === "3") return rl.close();
        console.log("Invalid option.");
        promptMenu();
      });
    } else {
      console.log(`Logged in as: ${currentUser.username}`);
      console.log("1. View Menu");
      console.log("2. Place Order");
      console.log("3. Track Order");
      console.log("4. Logout");
      console.log("5. Exit");
      rl.question("Choose an option: ", answer => {
        if (answer === "1") return showMenu();
        if (answer === "2") return promptPlaceOrder();
        if (answer === "3") return promptTrackOrder();
        if (answer === "4") { currentUser = null; return promptMenu(); }
        if (answer === "5") return rl.close();
        console.log("Invalid option.");
        promptMenu();
      });
    }
  }

  function promptRegister() {
    rl.question("Enter username: ", username => {
      rl.question("Enter password: ", password => {
        rl.question("Enter address: ", address => {
          const res = register(username, password, address);
          console.log(res.message);
          promptMenu();
        });
      });
    });
  }

  function promptLogin() {
    rl.question("Enter username: ", username => {
      rl.question("Enter password: ", password => {
        const res = login(username, password);
        if (res.success) {
          currentUser = { username, password };
        }
        console.log(res.message);
        promptMenu();
      });
    });
  }

  function showMenu() {
    const items = listMenu();
    console.log("\n--- Pizza Menu ---");
    items.forEach(item => {
      console.log(`${item.id}. ${item.name} - $${item.price.toFixed(2)}`);
    });
    promptMenu();
  }

  function promptPlaceOrder() {
    showMenu();
    rl.question("Enter pizza ID: ", id => {
      rl.question("Enter quantity: ", qty => {
        const res = placeOrder(currentUser.username, currentUser.password, parseInt(id), parseInt(qty));
        console.log(res.message);
        if (res.success) {
          console.log(`Your order ID is: ${res.orderId}`);
        }
        promptMenu();
      });
    });
  }

  function promptTrackOrder() {
    rl.question("Enter your order ID: ", id => {
      const res = trackOrder(parseInt(id), currentUser.username, currentUser.password);
      if (res.success) {
        console.log(`Order Status: ${res.status}`);
        console.log(res.order);
      } else {
        console.log(res.message);
      }
      promptMenu();
    });
  }

  rl.on('close', () => {
    console.log("\nThank you for using the Pizza Delivery App!");
    process.exit(0);
  });

  promptMenu();
}
