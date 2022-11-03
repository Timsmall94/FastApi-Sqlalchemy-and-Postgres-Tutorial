from database import Base
from sqlalchemy import String, Text, Boolean, Integer, Column


class Item(Base):
    __tablename__ = 'items'
    id=Column(Integer, primary_key=True)
    name=Column(String(255), nullable=False, unique=True)
    description=Column(Text)
    price=Column(Integer, nullable=False)
    on_offer=Column(Boolean, default=False)
    def __repr__(self):
        return f'<item name={self.name}  price={self.price}>'