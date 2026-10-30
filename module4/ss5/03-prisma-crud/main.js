require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
 const author = await prisma.author.create({ data: {
  name: 'Nguyen Van A', books: { create: [
   { title: 'Sach lap trinh', price: 120000 },
   { title: 'Sach database', price: 150000 },
  ] },
 } });
 console.log('CREATE author:', author);
 const found = await prisma.author.findUnique({ where: { id: author.id }, include: { books: true } });
 console.dir({ READ: found }, { depth: null });
 const firstBook = found.books[0];
 const updated = await prisma.book.update({ where: { id: firstBook.id }, data: { price: 180000 } });
 console.log('UPDATE book:', updated);
 const secondBook = found.books[1];
 console.log('DELETE book:', await prisma.book.delete({ where: { id: secondBook.id } }));
 try {
  await prisma.book.delete({ where: { id: -999 } });
 } catch (error) {
  if (error.code === 'P2025') console.log('Không tìm thấy Book để xóa');
  else throw error;
 }
}
main().catch(console.error).finally(async () => prisma.$disconnect());
