/* ===== DATA (Member B): categories + sample listings ===== */
window.App = window.App || {};

App.categories = ["Books", "Electronics", "Clothes", "Furniture", "Dorm essentials", "Other"];

App.communityStories = [
  { name: "Ngọc Anh", item: "Foldable study table", text: "I'm passing on a sturdy table that's perfect for a small room. Send me a message if you're interested!", image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1100&q=85", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" },
  { name: "Minh Quân", item: "Pre-loved English textbooks", text: "The books are complete, with a few notes inside. Hope they help someone studying for exams this term.", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1100&q=85", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" },
  { name: "Thu Hà", item: "Desk lamp for your study corner", text: "Soft light and works great in the evening. I'd love to pass it on to someone near the dorms.", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1100&q=85", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80" }
];

App.forumSamples = [
  { id: "welcome-1", name: "Mai Anh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80", time: "Today · 9:20 AM", text: "Where do you usually find second-hand textbooks? I'd love to buy some and save money. Meeting on campus would be ideal.", likes: 4, comments: [{ name: "Quang Huy", text: "Check the Products section—I've just seen a few books there." }, { name: "Linh Chi", text: "I usually meet at the library. It's convenient for both of us." }] },
  { id: "welcome-2", name: "Đức Minh", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80", time: "Yesterday · 4:45 PM", text: "Anyone interested in swapping dorm essentials? I'm looking for a small bookshelf and have a desk lamp in great condition.", likes: 7, comments: [{ name: "Thu Hà", text: "I have a small shelf. I'll message you!" }] },
  { id: "welcome-3", name: "Phương Thảo", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&q=80", time: "2 days ago", text: "A quick tip: when picking up a pre-loved item, I like to check it in person somewhere public on campus before confirming the deal.", likes: 12, comments: [{ name: "Mai Anh", text: "Thanks, that's really helpful!" }, { name: "Đức Minh", text: "I usually meet in the library lobby too." }] }
];

App.sampleItems = [
  { id: 1, title: "English Grammar in Use", category: "Books", type: "sell", price: 60000, condition: "Good", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=85", desc: "Intermediate edition, a few highlights.", seller: "Linh", contact: "linh@hanu.edu.vn" },
  { id: 2, title: "Casio fx-580VN X Calculator", category: "Electronics", type: "sell", price: 250000, condition: "Like new", image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=900&q=85", desc: "Used for one semester.", seller: "Minh", contact: "Zalo 0900 000 001" },
  { id: 3, title: "Desk lamp", category: "Dorm essentials", type: "free", price: 0, condition: "Good", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85", desc: "Moving out, must go this week!", seller: "Hana", contact: "hana@hanu.edu.vn" },
  { id: 4, title: "Hoodie (size M)", category: "Clothes", type: "swap", price: 0, condition: "Good", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85", desc: "Would swap for a size L.", seller: "Nam", contact: "Zalo 0900 000 002" },
  { id: 5, title: "Foldable study table", category: "Furniture", type: "sell", price: 180000, condition: "Fair", image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=900&q=85", desc: "Perfect for dorm rooms.", seller: "Trang", contact: "trang@hanu.edu.vn" },
  { id: 6, title: "Mechanical keyboard", category: "Electronics", type: "sell", price: 450000, condition: "Like new", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85", desc: "Blue switches, USB-C.", seller: "Duc", contact: "Zalo 0900 000 003" }
];
