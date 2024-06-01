document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('item-registration-form');
        const costumesCardsContainer = document.getElementById('costumes-cards');
        const costumesArray = [];

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const costumeId = document.getElementById('costumeId').value;
            const type = document.getElementById('type').value;
            const color = document.getElementById('color').value;
            const amount = document.getElementById('amount').value;
            const price = document.getElementById('price').value;
            const imgInput = document.getElementById('img');
            const imgFile = imgInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const imgSrc = e.target.result;
                
                const newCostume = {
                    costumeId,
                    imgSrc,
                    type,
                    color,
                    amount,
                    price
                };
                
                costumesArray.push(newCostume);
                createCard(newCostume);
            };
            
            if (imgFile) {
                reader.readAsDataURL(imgFile);
            }
        });

        function createCard(costume) {
            const card = document.createElement('div');
            card.classList.add('cos-card');
            
            card.innerHTML = `
                <div class="image">
                    <img src="${costume.imgSrc}" alt="${costume.type}" class="cos-img">
                </div>
                <div class="card-content">
                    <h3>${costume.type}</h3>
                    <div class="color">
                        <div class="rating">
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                        </div>
                        <p>Color : ${costume.color}</p>
                    </div>
                    <p class="price">Rs. ${costume.price}.00</p>
                </div>
            `;
            
            costumesCardsContainer.appendChild(card);
        }
    });