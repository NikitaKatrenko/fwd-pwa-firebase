import {
    collection,
    doc,
    query,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './db.js';


class BlogManager {
    constructor() {
        this.blogPosts = [];
        this.blogPostsContainer = document.getElementById('blogPostsContainer');
        this.fetchBlogPostsFromFirestore();
    }

    fetchBlogPostsFromFirestore() {
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    const postData = { ...change.doc.data(), id: change.doc.id };
                    this.blogPosts.push(postData);
                }
                if (change.type === "modified") {
                    const postData = { ...change.doc.data(), id: change.doc.id };
                    const index = this.blogPosts.findIndex(post => post.id === postData.id);
                    this.blogPosts[index] = postData;
                }
                if (change.type === "removed") {
                    const postData = { ...change.doc.data(), id: change.doc.id };
                    const index = this.blogPosts.findIndex(post => post.id === postData.id);
                    this.blogPosts.splice(index, 1);
                }
            });
            this.renderBlogPosts();
        });
    }

    renderBlogPosts() {
        this.blogPostsContainer.innerHTML = '';

        this.blogPosts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.classList.add('box', 'is-white');
            postElement.innerHTML = `
                <h1 class="title">${post.title}</h1>
                <p class="subtitle">Posted on ${post.date}</p>
                <div class="content">
                  <p>${post.content}</p>
                  <button class="button is-white-black is-small">Read More</button>
                  <button id="remove-post-${post.id}" data-post-id="${post.id}" class="button is-black-white is-small">Remove</button>
                </div>
              `;
            this.blogPostsContainer.appendChild(postElement);

            // Add event listener for remove button
            const removePostButton = document.getElementById(`remove-post-${post.id}`);
            removePostButton.addEventListener('click', () => {
                const id = removePostButton.dataset.postId;
                this.removePost(id);
            });
        });
    }

    removePost(id) {
        const docRef = doc(db, "posts", id);
        deleteDoc(docRef)
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    addPost(title, content) {
        const date = new Date().toLocaleDateString();

        if (title && content) {
            const docRef = doc(collection(db, "posts"));
            setDoc(docRef, { title, content, date })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    }
}

// Instantiate the BlogManager
const blogManager = new BlogManager();

// Get the button element
const saveChangesButton = document.querySelector('#add-post');

// Add event listener to add button
saveChangesButton.addEventListener('click', () => {
    const title = document.getElementById('modal-post-name').value;
    const content = document.getElementById('modal-post-text').value;
    blogManager.addPost(title, content);
});

// Initialize the blog manager and render existing posts
window.onload = () => {
    blogManager.renderBlogPosts();
};