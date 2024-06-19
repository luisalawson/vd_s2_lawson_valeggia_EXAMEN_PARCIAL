import datetime
import random
from faker import Faker
from faker.providers import address, date_time, internet, phone_number, credit_card, automotive
import uuid

PHONE_PROBABILITY = 0.7

class DataGenerator:
    def __init__(self):
        """Instantiates faker instance"""
        self.fake = Faker()
        self.fake.add_provider(address)
        self.fake.add_provider(date_time)
        self.fake.add_provider(internet)
        self.fake.add_provider(phone_number)
        self.fake.add_provider(credit_card)
        self.fake.add_provider(automotive)

    def generate_users(self, n: int) -> list:
        """Generates n users.

        Parameters
        ----------
        n : int
            Number of users to generate.

        Returns
        -------
        List[Dict[str, Any]]
            List of dicts that include name, surname, dni, email, address, phones, and cards.

        Notes
        -----
        Users are guaranteed to be unique only within a function call.
        """
        users = []
        for _ in range(n):
            phones = [self.fake.phone_number() for _ in range(random.randint(1, 3))]
            cards = [self.fake.credit_card_number() for _ in range(random.randint(1, 3))]
            users.append(
                {
                    "name": self.fake.unique.first_name(),
                    "surname": self.fake.unique.last_name(),
                    "dni": self.fake.unique.ssn(),
                    "email": self.fake.unique.ascii_email(),
                    "address": self.fake.unique.address(),
                    "phones": phones,
                    "cards": cards,
                }
            )
        return users

    def generate_user_orders(self, users: list, stores: list, products: list, deliveries: list, n: int) -> list:
        """Generates orders of users to stores with their products and assigns deliveries.

        Parameters
        ----------
        users : list
            List of users.
        stores : list
            List of stores.
        products : list
            List of products.
        deliveries : list
            List of deliveries.
        n : int
            Number of orders to generate.

        Returns
        -------
        List[Dict[str, Any]]
            List of orders with date of order, user, store, products, quantities, and delivery.
        """
        orders = []
        for _ in range(n):
            user = random.choice(users)
            store = random.choice(stores)
            num_products = random.randint(1, 5)  # Number of different products in an order
            order_products = random.sample(
                [product for product in products if product["store_id"] == store["store_id"]],
                num_products
            )
            order_items = [
                {
                    "product_id": product["product_id"],
                    "product_name": product["name"],
                    "quantity": random.randint(1, 10)  # Quantity of each product
                }
                for product in order_products
            ]
            store_deliveries = [delivery for delivery in deliveries if delivery["store_id"] == store["store_id"]]
            if store_deliveries:
                delivery = random.choice(store_deliveries)
            else:
                delivery = None

            orders.append(
                {
                    "date_order": self.fake.date_time_between(start_date='-1y', end_date='now'),
                    "user_dni": user["dni"],
                    "store_id": store["store_id"],
                    "order_items": order_items,
                    "delivery": delivery
                }
            )
        return orders
    def generate_complaints(self, users: list, stores: list, n: int) -> list:
        """Generates complaints for users.

        Parameters
        ----------
        users : list
            Users to generate complaints for.
        stores : list
            Stores to generate complaints for.
        n : int
            Number of complaints to generate.

        Returns
        -------
        List[Dict[str, Any]]
            List of dicts for complaints including properties such as dni_user, store_id, date, status, and description.

        Notes
        -----
        Complaints are randomly assigned to users and stores."""
        complaints = []
        for _ in range(n):
            user = users[random.randint(0, len(users) - 1)]
            store = stores[random.randint(0, len(stores) - 1)]
            complaints.append(
                {
                    "dni_user": user["dni"],
                    "store_id": store["store_id"],
                    "date_complaint": self.fake.date_time_between(start_date='-1y', end_date='now'),
                    "status": random.choice([True, False]),
                    "description": self.fake.text(max_nb_chars=200),
                }
            )
        return complaints

    def generate_stores(self, n: int) -> list:
        """Generates n stores.

        Parameters
        ----------
        n : int
            Number of stores to generate.

        Returns
        -------
        List[Dict[str, Any]]
            List of dicts that include store_id and address.

        Notes
        -----
        Stores are guaranteed to be unique only within a function call.
        """
        stores = []
        for _ in range(n):
            stores.append(
                {
                    "store_id": str(uuid.uuid4()),
                    "address": self.fake.unique.address(),
                }
            )
        return stores

    def generate_employees(self, stores: list, n: int) -> list:
        """Generates employees for stores ensuring no employee works at more than one store."""
        employees = []
        assigned_employees = set()
        for _ in range(n):
            store = stores[random.randint(0, len(stores) - 1)]
            employee = {
                "legajo": self.fake.unique.ssn(),
                "name": self.fake.first_name(),
                "surname": self.fake.last_name(),
                "email": self.fake.ascii_email(),
                "phone": self.fake.phone_number(),
                "address": self.fake.address(),
                "store_id": store["store_id"],
            }
            if employee["legajo"] not in assigned_employees:
                assigned_employees.add(employee["legajo"])
                employees.append(employee)
        return employees

    def generate_products(self, stores: list, product_names: list) -> list:
        """Generates products for stores."""
        products = []
        for product_name in product_names:
            for store in stores:
                products.append(
                    {
                        "product_id": str(uuid.uuid4()),
                        "name": product_name,
                        "brand": self.fake.company(),
                        "store_id": store["store_id"],
                        "price": round(random.uniform(10.0, 100.0), 2),
                        "inventory": random.randint(1, 100),
                    }
                )
        return products

    def generate_suppliers(self, products: list) -> list:
        """Generates suppliers for products in stores."""
        suppliers = []
        assigned_products = set()
        for product in products:
            if product["product_id"] not in assigned_products:
                assigned_products.add(product["product_id"])
                suppliers.append(
                    {
                        "cuil": self.fake.unique.ssn(),
                        "name": self.fake.company(),
                        "phone": self.fake.phone_number(),
                        "email": self.fake.ascii_email(),
                        "product_id": product["product_id"],
                        "store_address": product["store_id"],
                    }
                )
        return suppliers
    def generate_deliveries(self, stores: list, n: int) -> list:
        """Generates deliveries with license plate, status, and store.

        Parameters
        ----------
        stores : list
            List of stores.
        n : int
            Number of deliveries to generate.

        Returns
        -------
        List[Dict[str, Any]]
            List of deliveries with license plate, status, and store.
        """
        deliveries = []
        for _ in range(n):
            store = random.choice(stores)
            deliveries.append(
                {
                    "license_plate": self.fake.license_plate(),
                    "status": random.choice(["en camino", "esperando", "listo"]),
                    "store_id": store["store_id"]
                }
            )
        return deliveries
