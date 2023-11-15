import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`INSERT INTO categories
    (name, image)
    VALUES
    ('Boats / Yachts / Jetskis', 'nkzezp90z9zq6fvuvd4w'),
    ('Books / Movies / Music', 't6hwyefazjvrsm5xptiy'),
    ('Computer / Software', 'uwyvklzlmfzpbbkd2i17'),
    ('Services', 'cip4kxkyahujnyb62pf8'),
    ('Leisure / Instruments / Culinary', 'rkzrhroyypsgssu1sjd5'),
    ('Games / Consoles', 'vqovxzd0ajdewjjfqhie'),
    ('Home / Garden / Workshop', 'z3niumeg9suuezpog5ry'),
    ('Cameras / TV / Multimedia', 'lqoffjbpesufys8wosys'),
    ('Car Accessories / Motorcycle Parts', 'yx5tsgkzyr60bvsrubpo'),
    ('Fashion / Accessories', 'amkwne7fz6sa5q30elhm'),
    ('Smartphones / Telephony', 'rimzds8gicb7lytmmh9o'),
    ('Play / Toys', 'nvp8wircfesexgiflab1'),
    ('Sport / Sports Equipment', 'xvrmzizzqp0khnx1k0st'),
    ('Animals / Pet Supplies', 'zhuxzf4spfgnsmfy9riw'),
    ('Watches / Jewelry', 'jekesyj1gnuq71ec9bfy'),
    ('Living / Household / Gastronomy', 'u4w0xbwkjssue4fxnzfw'),
    ('Antiques / Art', 'vfrtxcex1jctuo90jvmo'),
    ('Baby / Child', 'utcrl8ewecabm8rjjnpr'),
    ('Beauty / Health / Wellness', 'oehmcdh8mwwyfjjvos7w')
`;
}

export async function down(sql: Sql) {
  await sql`DELETE FROM categories`;
}
