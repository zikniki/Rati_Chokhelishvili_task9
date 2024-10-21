async function renderCards() {
    try {
        const todosResponse = await axios.get("https://jsonplaceholder.typicode.com/todos");
        const usersResponse = await axios.get("https://jsonplaceholder.typicode.com/users");
        const todos = todosResponse.data;
        const users = usersResponse.data;

        const container = document.getElementById('container');
        container.innerHTML = '';

        for (let i = 0; i < todos.length && i < users.length; i++) {
            const statusClass = todos[i].completed ? 'status-true' : 'status-false';
            const card = `
                <div class="user1" data-id="${todos[i].id}">
                    <div class="chekBox1 checkbox-wrapper-23">
                        <input type="checkbox" id="check-${i}" ${todos[i].completed ? 'checked' : ''}>
                        <label for="check-${i}" style="--size: 30px">
                            <svg viewBox="0 0 50 50">
                                <path d="M5 30 L 20 45 L 45 5"></path>
                            </svg>
                        </label>
                    </div>
                    <div class="icon1"><img src="icon/Rectangle 79.svg" alt=""></div>
                    <div class="title1">${todos[i].title}</div>
                    <div class="email1">${users[i].email}</div>
                    <div class="address1">${users[i].address.street}, ${users[i].address.suite}</div>
                    <div class="zip1">${users[i].address.zipcode}</div>
                    <div class="status1 ${statusClass}">${todos[i].completed ? 'Active' : 'Not active'}</div>
                    <div class="delete1"><button data-id="${todos[i].id}"><i style="font-size:24px" class="fa fa-trash"></i></button></div>
                </div>
            `;
            container.innerHTML += card;
        }

        container.addEventListener('click', function (event) {
            if (event.target.closest('button')) {
                const button = event.target.closest('button');
                const id = button.dataset.id;
                const rowToDelete = Array.from(container.querySelectorAll('.user1')).find(row => row.dataset.id == id);
                if (rowToDelete) {
                    rowToDelete.remove();
                }
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

renderCards();