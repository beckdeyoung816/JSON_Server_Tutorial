// javascript for index.html

const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {
    // Sort posts by likes in descending order
    let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc'

    if (term) { // if term is not empty. Necessary because no term in original call
        uri += `&q=${term}`;  // append the query string
    }

    const res = await fetch(uri); // fetch posts

    const posts = await res.json(); // convert to json

    console.log(posts);

    let template = '';

    // Loop through posts and create html template
    posts.forEach(post => {
        template += `
            <div class="post">
                <h2>${post.title}</h2>
                <p><small>${post.likes} likes</small></p>
                <p>${post.body.slice(0, 200)}</p>
                <a href="/details.html?id=${post.id}">Read more...</a>
            </div>
        `
    })

    container.innerHTML = template;

}

searchForm.addEventListener('submit', async (e) => {
    // Prevent default action of form, which is reloading the page
    e.preventDefault();
    renderPosts(searchForm.term.value.trim()); // Get search term and pass it to renderPosts
});

window.addEventListener('DOMContentLoaded', () => renderPosts()); // Call renderPosts on page load
