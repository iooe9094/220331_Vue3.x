// 전역 컴포넌트
app.component("product-display", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template: /* html */
    `
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image">
                </div>

                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <p v-if="onSale">{{ saleMessage }}</p>
                    <p v-if="InStock">In Stock</p>
                    <p v-else>Out Of Stock</p>
                    <ul>
                        <li v-for="detail in details">
                            {{ detail }}
                        </li>
                    </ul>
                    <div v-for="(variant, index) in variants" 
                         :key="variant.id" 
                         v-on:mouseover="updateImage(index)"
                         class="color-circle"
                         :style="{ 'background-color' : variant.color }">
                    </div>
                    <button class="button"
                            :class="{ disabledButton: !InStock }"
                            :disabled="InStock =! InStock"
                            v-on:click="addToCart">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            product: "Socks",
            selectedVariant: 0,
            details: ["50% cotten", "30% wool", "20% polyester"],
            variants: [
                { 
                    id: 2234, 
                    color: "green", 
                    image:"./assets/images/socks_green.jpg",
                    quantity: 50
                },
                { 
                    id: 2235, 
                    color: "blue", 
                    image:"./assets/images/socks_blue.jpg",
                    quantity: 0
                }
            ],
            sizes: ["10", "20"],
            brand: "Vue Mastery",
            onSale: true

        }
    },
    methods: {
        addToCart: function() {
            this.cart += 1;
        },
        updateImage: function(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        InStock() {
            return this.variants[this.selectedVariant].quantity
        },
        saleMessage() {
            return this.brand + " " + this.product + " is on sale"
        },
        onSale() {
            return true
        }
    }
});