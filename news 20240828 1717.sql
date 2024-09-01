--
-- Definition for database news
--
DROP DATABASE IF EXISTS news;
CREATE DATABASE IF NOT EXISTS news
	CHARACTER SET utf8
	COLLATE utf8_general_ci;

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

-- 
-- Set default database
--
USE news;

--
-- Definition for table sources_tbl
--
CREATE TABLE IF NOT EXISTS sources_tbl (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255) DEFAULT 'NULL',
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 2
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Definition for table users
--
CREATE TABLE IF NOT EXISTS users (
  user_id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) DEFAULT 'NULL',
  password VARCHAR(255) DEFAULT 'NULL',
  user_type TINYINT(1) DEFAULT 1,
  PRIMARY KEY (user_id)
)
ENGINE = INNODB
AUTO_INCREMENT = 2
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Definition for table news_tbl
--
CREATE TABLE IF NOT EXISTS news_tbl (
  id INT(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  image VARCHAR(255) DEFAULT 'NULL',
  url VARCHAR(255) DEFAULT 'NULL',
  keywords VARCHAR(255) DEFAULT 'NULL',
  source_id INT(11) DEFAULT NULL,
  is_published VARCHAR(255) DEFAULT 'NULL',
  type TINYINT(1) DEFAULT NULL COMMENT '1. article
2. video',
  PRIMARY KEY (id),
  INDEX source_id (source_id),
  CONSTRAINT news_tbl_ibfk_1 FOREIGN KEY (source_id)
    REFERENCES sources_tbl(id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 79
AVG_ROW_LENGTH = 1310
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Definition for view news_vw
--
CREATE OR REPLACE 
	DEFINER = 'root'@'localhost'
VIEW news_vw
AS
	select `news_tbl`.`id` AS `id`,`news_tbl`.`title` AS `title`,`news_tbl`.`date` AS `date`,`news_tbl`.`image` AS `image`,`news_tbl`.`url` AS `url`,`news_tbl`.`keywords` AS `keywords`,`news_tbl`.`source_id` AS `source_id`,`news_tbl`.`is_published` AS `is_published`,`news_tbl`.`type` AS `type`,`sources_tbl`.`name` AS `name` from (`news_tbl` join `sources_tbl` on(`news_tbl`.`source_id` = `sources_tbl`.`id`));

--
-- Definition for view sources_vw
--
CREATE OR REPLACE 
	DEFINER = 'root'@'localhost'
VIEW sources_vw
AS
	select `sources_tbl`.`id` AS `id`,`sources_tbl`.`name` AS `name`,`sources_tbl`.`url` AS `url`,count(`news_tbl`.`source_id`) AS `news_count` from (`news_tbl` join `sources_tbl` on(`news_tbl`.`source_id` = `sources_tbl`.`id`)) group by `sources_tbl`.`id`,`sources_tbl`.`name`,`sources_tbl`.`url`;

-- 
-- Dumping data for table sources_tbl
--
INSERT INTO sources_tbl VALUES
(1, 'البوابة التقنية', 'https://www.aitnews.com');

-- 
-- Dumping data for table users
--
INSERT INTO users VALUES
(1, 'admin', '$2b$10$nDz.ZboPvBSzYI5elyp1.uN1K0l7VBpqMvk77ohGlndXAx6em.G76', 1);

-- 
-- Dumping data for table news_tbl
--
INSERT INTO news_tbl VALUES
(31, 'تيليجرام تدين رسميًا اعتقال رئيسها التنفيذي في فرنسا', '26 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Telegran-Pavel-Durov-Arrest-220x150.jpg', 'https://aitnews.com/2024/08/26/%d8%aa%d9%8a%d9%84%d9%8a%d8%ac%d8%b1%d8%a7%d9%85-%d8%aa%d8%af%d9%8a%d9%86-%d8%b1%d8%b3%d9%85%d9%8a%d9%8b%d8%a7-%d8%a7%d8%b9%d8%aa%d9%82%d8%a7%d9%84-%d8%b1%d8%a6%d9%8a%d8%b3%d9%87%d8%a7-%d8%a7%d9%84/', '', 1, NULL, NULL),
(32, 'أمازون توقف ميزة أساسية في جهاز Echo Show 8 وسط استياء عملائها', '26 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Amazon-Echo-Show-8-220x150.jpg', 'https://aitnews.com/2024/08/26/%d8%a3%d9%85%d8%a7%d8%b2%d9%88%d9%86-%d8%aa%d9%88%d9%82%d9%81-%d9%85%d9%8a%d8%b2%d8%a9-%d8%a3%d8%b3%d8%a7%d8%b3%d9%8a%d8%a9-%d9%81%d9%8a-%d8%ac%d9%87%d8%a7%d8%b2-echo-show-8-%d9%88%d8%b3%d8%b7-%d8%a7/', '', 1, NULL, NULL),
(33, 'اتهامات لجوجل بإجبار أصحاب المواقع على استخدام محتواهم في الذكاء الاصطناعي', '26 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Google-AI-Overview-Publishers-220x150.jpg', 'https://aitnews.com/2024/08/26/%d8%a7%d8%aa%d9%87%d8%a7%d9%85%d8%a7%d8%aa-%d9%84%d8%ac%d9%88%d8%ac%d9%84-%d8%a8%d8%a5%d8%ac%d8%a8%d8%a7%d8%b1-%d8%a3%d8%b5%d8%ad%d8%a7%d8%a8-%d8%a7%d9%84%d9%85%d9%88%d8%a7%d9%82%d8%b9-%d8%b9%d9%84/', '', 1, NULL, NULL),
(34, 'جوجل تطلق ميزة اللمس التكيفي في هواتف بكسل 9', '26 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Google-Pixel-9-adaptive-touch-220x150.jpg', 'https://aitnews.com/2024/08/26/%d8%ac%d9%88%d8%ac%d9%84-%d8%aa%d8%b7%d9%84%d9%82-%d9%85%d9%8a%d8%b2%d8%a9-%d8%a7%d9%84%d9%84%d9%85%d8%b3-%d8%a7%d9%84%d8%aa%d9%83%d9%8a%d9%81%d9%8a-%d9%81%d9%8a-%d9%87%d9%88%d8%a7%d8%aa%d9%81-%d8%a8/', '', 1, NULL, NULL),
(35, 'سوني تقترب من إعلان بلايستيشن 5 برو', '26 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Playstation-5-Pro-Leaks-390x220.jpg', 'https://aitnews.com/2024/08/26/%d8%b3%d9%88%d9%86%d9%8a-%d8%aa%d9%82%d8%aa%d8%b1%d8%a8-%d9%85%d9%86-%d8%a5%d8%b9%d9%84%d8%a7%d9%86-%d8%a8%d9%84%d8%a7%d9%8a%d8%b3%d8%aa%d9%8a%d8%b4%d9%86-5-%d8%a8%d8%b1%d9%88/', '', 1, NULL, NULL),
(36, 'كيفية تحقيق أقصى استفادة من هواتف جوجل Pixel 9 الجديدة', '25 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Pixel-9_20240825_211316_٠٠٠٠-390x220.jpg', 'https://aitnews.com/2024/08/25/%d9%83%d9%8a%d9%81%d9%8a%d8%a9-%d8%aa%d8%ad%d9%82%d9%8a%d9%82-%d8%a3%d9%82%d8%b5%d9%89-%d8%a7%d8%b3%d8%aa%d9%81%d8%a7%d8%af%d8%a9-%d9%85%d9%86-%d9%87%d9%88%d8%a7%d8%aa%d9%81-%d8%ac%d9%88%d8%ac%d9%84-p/', '', 1, NULL, NULL),
(37, 'السلطات الفرنسية تعتقل الرئيس التنفيذي لتيليجرام', '25 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Pavel-Durov-Telegram-CEO-arrested-in-France-390x220.jpg', 'https://aitnews.com/2024/08/25/%d8%a7%d9%84%d8%b3%d9%84%d8%b7%d8%a7%d8%aa-%d8%a7%d9%84%d9%81%d8%b1%d9%86%d8%b3%d9%8a%d8%a9-%d8%aa%d8%b9%d8%aa%d9%82%d9%84-%d8%a7%d9%84%d8%b1%d8%a6%d9%8a%d8%b3-%d8%a7%d9%84%d8%aa%d9%86%d9%81%d9%8a/', '', 1, NULL, NULL),
(38, 'ابتكار جديد.. روبوتات تشعر باللمس مثل البشر دون الحاجة إلى جلد اصطناعي', '25 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/robots-sense-human-touch-without-artificial-skin-390x220.jpg', 'https://aitnews.com/2024/08/25/%d8%a7%d8%a8%d8%aa%d9%83%d8%a7%d8%b1-%d8%ac%d8%af%d9%8a%d8%af-%d8%b1%d9%88%d8%a8%d9%88%d8%aa%d8%a7%d8%aa-%d8%aa%d8%b4%d8%b9%d8%b1-%d8%a8%d8%a7%d9%84%d9%84%d9%85%d8%b3-%d9%85%d8%ab%d9%84-%d8%a7%d9%84/', '', 1, NULL, NULL),
(39, 'أهم الأمور التي تنبغي مراعاتها قبل شراء قفل ذكي للمنزل', '25 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Smart-Lock_20240825_131512_٠٠٠٠-390x220.jpg', 'https://aitnews.com/2024/08/25/%d8%a3%d9%87%d9%85-%d8%a7%d9%84%d8%a3%d9%85%d9%88%d8%b1-%d8%a7%d9%84%d8%aa%d9%8a-%d8%aa%d9%86%d8%a8%d8%ba%d9%8a-%d9%85%d8%b1%d8%a7%d8%b9%d8%a7%d8%aa%d9%87%d8%a7-%d9%82%d8%a8%d9%84-%d8%b4%d8%b1%d8%a7/', '', 1, NULL, NULL),
(40, 'كيف يساهم الذكاء الاصطناعي في تعزيز التعاون والعمل الجماعي في المؤسسات؟', '25 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/How-AI-Driven-Tools-Are-Reshaping-Collaboration_20240825_005436_٠٠٠٠-390x220.jpg', 'https://aitnews.com/2024/08/25/%d9%83%d9%8a%d9%81-%d9%8a%d8%b3%d8%a7%d9%87%d9%85-%d8%a7%d9%84%d8%b0%d9%83%d8%a7%d8%a1-%d8%a7%d9%84%d8%a7%d8%b5%d8%b7%d9%86%d8%a7%d8%b9%d9%8a-%d9%81%d9%8a-%d8%aa%d8%b9%d8%b2%d9%8a%d8%b2-%d8%a7%d9%84/', '', 1, NULL, NULL),
(41, 'مزايا يتفوق بها هاتف جوجل Pixel 9 Pro XL على هاتف iPhone 15 Pro Max', '25 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Pixel-9-Pro-XL-على-هاتف-iPhone-15-Pro-Max_20240825_003523_٠٠٠٠-390x220.jpg', 'https://aitnews.com/2024/08/25/%d9%85%d8%b2%d8%a7%d9%8a%d8%a7-%d9%8a%d8%aa%d9%81%d9%88%d9%82-%d8%a8%d9%87%d8%a7-%d9%87%d8%a7%d8%aa%d9%81-%d8%ac%d9%88%d8%ac%d9%84-pixel-9-pro-xl-%d8%b9%d9%84%d9%89-%d9%87%d8%a7%d8%aa%d9%81-iphone-15/', '', 1, NULL, NULL),
(42, 'مايكروسوفت تطلق أجهزة “Surface” المدعومة بالذكاء الاصطناعي في الإمارات', '25 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Copilot-PC-390x220.jpg', 'https://aitnews.com/2024/08/25/%d9%85%d8%a7%d9%8a%d9%83%d8%b1%d9%88%d8%b3%d9%88%d9%81%d8%aa-%d8%aa%d8%b7%d9%84%d9%82-%d8%a3%d8%ac%d9%87%d8%b2%d8%a9-surface-%d8%a7%d9%84%d9%85%d8%af%d8%b9%d9%88%d9%85%d8%a9-%d8%a8%d8%a7%d9%84/', '', 1, NULL, NULL),
(43, 'ChatGPT يواصل الهيمنة على سوق تطبيقات الذكاء الاصطناعي', '24 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/ChatGPT-app-390x220.jpg', 'https://aitnews.com/2024/08/24/chatgpt-%d9%8a%d9%88%d8%a7%d8%b5%d9%84-%d8%a7%d9%84%d9%87%d9%8a%d9%85%d9%86%d8%a9-%d8%b9%d9%84%d9%89-%d8%b3%d9%88%d9%82-%d8%aa%d8%b7%d8%a8%d9%8a%d9%82%d8%a7%d8%aa-%d8%a7%d9%84%d8%b0%d9%83%d8%a7%d8%a1/', '', 1, NULL, NULL),
(44, 'أدوار استثنائية للذكاء الاصطناعي في معالجة تغير المناخ', '24 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/AI-is-helping-tackle-climate-change_20240824_142221_٠٠٠٠-390x220.jpg', 'https://aitnews.com/2024/08/24/%d8%a3%d8%af%d9%88%d8%a7%d8%b1-%d8%a7%d8%b3%d8%aa%d8%ab%d9%86%d8%a7%d8%a6%d9%8a%d8%a9-%d9%84%d9%84%d8%b0%d9%83%d8%a7%d8%a1-%d8%a7%d9%84%d8%a7%d8%b5%d8%b7%d9%86%d8%a7%d8%b9%d9%8a-%d9%81%d9%8a-%d9%85/', '', 1, NULL, NULL),
(45, 'مايكروسوفت تتخلّص من لوحة التحكم الكلاسيكية في ويندوز بعد 39 عامًا', '24 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Windows-11-Control-Panel-390x220.jpg', 'https://aitnews.com/2024/08/24/%d9%85%d8%a7%d9%8a%d9%83%d8%b1%d9%88%d8%b3%d9%88%d9%81%d8%aa-%d8%aa%d8%aa%d8%ae%d9%84%d9%91%d8%b5-%d9%85%d9%86-%d9%84%d9%88%d8%ad%d8%a9-%d8%a7%d9%84%d8%aa%d8%ad%d9%83%d9%85-%d8%a7%d9%84%d9%83%d9%84/', '', 1, NULL, NULL),
(46, '5 مزايا جديدة قادمة إلى تطبيق الهاتف في نظام iOS 18', '24 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/iOS-18-phone-app-390x220.jpg', 'https://aitnews.com/2024/08/24/5-%d9%85%d8%b2%d8%a7%d9%8a%d8%a7-%d8%ac%d8%af%d9%8a%d8%af%d8%a9-%d9%82%d8%a7%d8%af%d9%85%d8%a9-%d8%a5%d9%84%d9%89-%d8%aa%d8%b7%d8%a8%d9%8a%d9%82-%d8%a7%d9%84%d9%87%d8%a7%d8%aa%d9%81-%d9%81%d9%8a/', '', 1, NULL, NULL),
(47, 'الإمارات توظف تقنية النانو في تلقيح السحب لزيادة هطول الأمطار', '24 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/uaerep-390x220.jpg', 'https://aitnews.com/2024/08/24/%d8%a7%d9%84%d8%a5%d9%85%d8%a7%d8%b1%d8%a7%d8%aa-%d8%aa%d9%88%d8%b8%d9%81-%d8%aa%d9%82%d9%86%d9%8a%d8%a9-%d8%a7%d9%84%d9%86%d8%a7%d9%86%d9%88-%d9%81%d9%8a-%d8%aa%d9%84%d9%82%d9%8a%d8%ad-%d8%a7%d9%84/', '', 1, NULL, NULL),
(48, 'مقارنة بين ساعتي Pixel Watch 3 و Apple Watch Ultra 2', '24 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Pixel-Watch-3-vs-Apple-Watch-Ultra-2_20240824_193433_٠٠٠٠-390x220.jpg', 'https://aitnews.com/2024/08/24/%d9%85%d9%82%d8%a7%d8%b1%d9%86%d8%a9-%d8%a8%d9%8a%d9%86-%d8%b3%d8%a7%d8%b9%d8%aa%d9%8a-pixel-watch-3-%d9%88-apple-watch-ultra-2/', '', 1, NULL, NULL),
(49, 'مزايا جديدة قادمة إلى تطبيق الهاتف في نظام iOS 18', '25 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/ios-18-9zQHWTvrJsU-390x220.jpg', 'https://aitnews.com/2024/08/25/%d9%85%d8%b2%d8%a7%d9%8a%d8%a7-%d8%ac%d8%af%d9%8a%d8%af%d8%a9-%d9%82%d8%a7%d8%af%d9%85%d8%a9-%d8%a5%d9%84%d9%89-%d8%aa%d8%b7%d8%a8%d9%8a%d9%82-%d8%a7%d9%84%d9%87%d8%a7%d8%aa%d9%81-%d9%81%d9%8a-%d9%86/', '', 1, NULL, NULL),
(50, 'أدوبي تحرز تقدماً في عالم تحرير الصور بالذكاء الاصطناعي', '24 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/QWUOiK0tzIQ-220x150.jpg', 'https://aitnews.com/2024/08/24/%d8%a3%d8%af%d9%88%d8%a8%d9%8a-%d8%aa%d8%ad%d8%b1%d8%b2-%d8%aa%d9%82%d8%af%d9%85%d8%a7%d9%8b-%d9%81%d9%8a-%d8%b9%d8%a7%d9%84%d9%85-%d8%aa%d8%ad%d8%b1%d9%8a%d8%b1-%d8%a7%d9%84%d8%b5%d9%88%d8%b1-%d8%a8/', '', 1, NULL, NULL),
(51, 'أبرز الأجهزة المتوقع إعلانها في حدث آبل القادم', '23 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/yNmXidE41nA-220x150.jpg', 'https://aitnews.com/2024/08/23/%d8%a3%d8%a8%d8%b1%d8%b2-%d8%a7%d9%84%d8%a3%d8%ac%d9%87%d8%b2%d8%a9-%d8%a7%d9%84%d9%85%d8%aa%d9%88%d9%82%d8%b9-%d8%a5%d8%b9%d9%84%d8%a7%d9%86%d9%87%d8%a7-%d9%81%d9%8a-%d8%ad%d8%af%d8%ab-%d8%a2%d8%a8/', '', 1, NULL, NULL),
(52, 'كاسبرسكي تحذر من حملة احتيالية جديدة تستهدف سرقة أموالك وبياناتك', '22 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/0a_w-msviYs-220x150.jpg', 'https://aitnews.com/2024/08/22/%d9%83%d8%a7%d8%b3%d8%a8%d8%b1%d8%b3%d9%83%d9%8a-%d8%aa%d8%ad%d8%b0%d8%b1-%d9%85%d9%86-%d8%ad%d9%85%d9%84%d8%a9-%d8%a7%d8%ad%d8%aa%d9%8a%d8%a7%d9%84%d9%8a%d8%a9-%d8%ac%d8%af%d9%8a%d8%af%d8%a9-%d8%aa-2/', '', 1, NULL, NULL),
(53, 'الحوسبة الحيوية.. هل هي الحل الأمثل لتحديات الذكاء الاصطناعي؟', '21 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/iqwpQW0sEE-220x150.jpg', 'https://aitnews.com/2024/08/21/%d8%a7%d9%84%d8%ad%d9%88%d8%b3%d8%a8%d8%a9-%d8%a7%d9%84%d8%ad%d9%8a%d9%88%d9%8a%d8%a9-%d9%87%d9%84-%d9%87%d9%8a-%d8%a7%d9%84%d8%ad%d9%84-%d8%a7%d9%84%d8%a3%d9%85%d8%ab%d9%84-%d9%84%d8%aa%d8%ad%d8%af-2/', '', 1, NULL, NULL),
(54, 'لامبورغيني تكشف عن خليفة السيارة الهجينة الخارقة', '20 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/7Qfv8lvqomA-220x150.jpg', 'https://aitnews.com/2024/08/20/%d9%84%d8%a7%d9%85%d8%a8%d9%88%d8%b1%d8%ba%d9%8a%d9%86%d9%8a-%d8%aa%d9%83%d8%b4%d9%81-%d8%b9%d9%86-%d8%ae%d9%84%d9%8a%d9%81%d8%a9-%d8%a7%d9%84%d8%b3%d9%8a%d8%a7%d8%b1%d8%a9-%d8%a7%d9%84%d9%87%d8%ac-2/', '', 1, NULL, NULL),
(55, 'هل يهدد فصل نظام أندرويد مستقبل الذكاء الاصطناعي في جوجل؟', '19 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/0CTTnZJe1oQ-1-220x150.jpg', 'https://aitnews.com/2024/08/19/%d9%87%d9%84-%d9%8a%d9%87%d8%af%d8%af-%d9%81%d8%b5%d9%84-%d9%86%d8%b8%d8%a7%d9%85-%d8%a3%d9%86%d8%af%d8%b1%d9%88%d9%8a%d8%af-%d9%85%d8%b3%d8%aa%d9%82%d8%a8%d9%84-%d8%a7%d9%84%d8%b0%d9%83%d8%a7%d8%a1/', '', 1, NULL, NULL),
(56, 'المزايا القادمة إلى هواتف أندرويد في نظام أندرويد 15', '18 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/15-SL0WiPjeA4g-220x150.jpg', 'https://aitnews.com/2024/08/18/%d8%a7%d9%84%d9%85%d8%b2%d8%a7%d9%8a%d8%a7-%d8%a7%d9%84%d9%82%d8%a7%d8%af%d9%85%d8%a9-%d8%a5%d9%84%d9%89-%d9%87%d9%88%d8%a7%d8%aa%d9%81-%d8%a3%d9%86%d8%af%d8%b1%d9%88%d9%8a%d8%af-%d9%81%d9%8a-%d9%86/', '', 1, NULL, NULL),
(57, 'ريماك تكشف عن السيارة الخارقة الكهربائية Nevera R', '17 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/LaSLtN6CvKI-220x150.jpg', 'https://aitnews.com/2024/08/17/%d8%ac%d9%88%d8%ac%d9%84-%d8%aa%d9%88%d8%a7%d8%ac%d9%87-%d8%ae%d8%b7%d8%b1-%d8%a7%d9%84%d8%aa%d9%81%d9%83%d9%8a%d9%83-%d8%a8%d8%b9%d8%af-%d8%a5%d8%af%d8%a7%d9%86%d8%aa%d9%87%d8%a7-%d8%a8%d8%a7%d9%84-3/', '', 1, NULL, NULL),
(58, 'جوجل تواجه خطر التفكيك بعد إدانتها بالاحتكار', '16 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/6C65smGLfDM-220x150.jpg', 'https://aitnews.com/2024/08/16/%d8%ac%d9%88%d8%ac%d9%84-%d8%aa%d9%88%d8%a7%d8%ac%d9%87-%d8%ae%d8%b7%d8%b1-%d8%a7%d9%84%d8%aa%d9%81%d9%83%d9%8a%d9%83-%d8%a8%d8%b9%d8%af-%d8%a5%d8%af%d8%a7%d9%86%d8%aa%d9%87%d8%a7-%d8%a8%d8%a7%d9%84-2/', '', 1, NULL, NULL),
(59, 'xAI تكشف عن Grok-2 و Grok-2 Mini', '15 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/yOfhzxC-hX8-220x150.jpg', 'https://aitnews.com/2024/08/15/xai-%d8%aa%d9%83%d8%b4%d9%81-%d8%b9%d9%86-grok-2-%d9%88-grok-2-mini-2/', '', 1, NULL, NULL),
(60, 'العاشرة تك | OpenAI تطرح إصداراً جديداً كلياً من GPT-4o', '14 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/openai-gpt-4o-rEMsZg0NNSE-220x150.jpg', 'https://aitnews.com/2024/08/14/%d8%a7%d9%84%d8%b9%d8%a7%d8%b4%d8%b1%d8%a9-%d8%aa%d9%83-openai-%d8%aa%d8%b7%d8%b1%d8%ad-%d8%a5%d8%b5%d8%af%d8%a7%d8%b1%d8%a7%d9%8b-%d8%ac%d8%af%d9%8a%d8%af%d8%a7%d9%8b-%d9%83%d9%84%d9%8a%d8%a7%d9%8b/', '', 1, NULL, NULL),
(61, 'LG تطالب آبل بالتعويض عن إلغاء مشروع شاشات MicroLED', '13 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/lg-microled-eV4MDxPOvm8-220x150.jpg', 'https://aitnews.com/2024/08/13/lg-%d8%aa%d8%b7%d8%a7%d9%84%d8%a8-%d8%a2%d8%a8%d9%84-%d8%a8%d8%a7%d9%84%d8%aa%d8%b9%d9%88%d9%8a%d8%b6-%d8%b9%d9%86-%d8%a5%d9%84%d8%ba%d8%a7%d8%a1-%d9%85%d8%b4%d8%b1%d9%88%d8%b9-%d8%b4%d8%a7%d8%b4-2/', '', 1, NULL, NULL),
(62, 'علماء يبتكرون نظاماً لكشف تعاطي المنشطات بالذكاء الاصطناعي', '12 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/IxVhDHFZ4FU-220x150.jpg', 'https://aitnews.com/2024/08/12/%d8%b9%d9%84%d9%85%d8%a7%d8%a1-%d9%8a%d8%a8%d8%aa%d9%83%d8%b1%d9%88%d9%86-%d9%86%d8%b8%d8%a7%d9%85%d8%a7%d9%8b-%d9%84%d9%83%d8%b4%d9%81-%d8%aa%d8%b9%d8%a7%d8%b7%d9%8a-%d8%a7%d9%84%d9%85%d9%86%d8%b4/', '', 1, NULL, NULL),
(63, 'جايتكس جلوبال 2024.. استعدوا للإصدارات الجديدة', '11 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/2024-BIYG7OEKnSw-220x150.jpg', 'https://aitnews.com/2024/08/11/%d8%ac%d8%a7%d9%8a%d8%aa%d9%83%d8%b3-%d8%ac%d9%84%d9%88%d8%a8%d8%a7%d9%84-2024-%d8%a7%d8%b3%d8%aa%d8%b9%d8%af%d9%88%d8%a7-%d9%84%d9%84%d8%a5%d8%b5%d8%af%d8%a7%d8%b1%d8%a7%d8%aa-%d8%a7%d9%84%d8%ac/', '', 1, NULL, NULL),
(64, 'صوت الذكاء الاصطناعي نعمة أم نقمة؟ OpenAI تكشف وتحذّر', '10 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/openai-RWW6N3r4vp4-1-220x150.jpg', 'https://aitnews.com/2024/08/10/%d8%b5%d9%88%d8%aa-%d8%a7%d9%84%d8%b0%d9%83%d8%a7%d8%a1-%d8%a7%d9%84%d8%a7%d8%b5%d8%b7%d9%86%d8%a7%d8%b9%d9%8a-%d9%86%d8%b9%d9%85%d8%a9-%d8%a3%d9%85-%d9%86%d9%82%d9%85%d8%a9%d8%9f-openai-%d8%aa%d9%83/', '', 1, NULL, NULL),
(65, 'آبل تخطط لإطلاق أصغر حاسوب لها على الإطلاق', '9 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/yXRBCz591vc-220x150.jpg', 'https://aitnews.com/2024/08/09/%d8%a2%d8%a8%d9%84-%d8%aa%d8%ae%d8%b7%d8%b7-%d9%84%d8%a5%d8%b7%d9%84%d8%a7%d9%82-%d8%a3%d8%b5%d8%ba%d8%b1-%d8%ad%d8%a7%d8%b3%d9%88%d8%a8-%d9%84%d9%87%d8%a7-%d8%b9%d9%84%d9%89-%d8%a7%d9%84%d8%a5-2/', '', 1, NULL, NULL),
(66, 'ثورة جديدة في اقتصاد المحتوى.. الذكاء الاصطناعي يفتح آفاقاً جديدة لتقاسم العائدات', '8 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Xg36mxmH3OI-220x150.jpg', 'https://aitnews.com/2024/08/08/%d8%ab%d9%88%d8%b1%d8%a9-%d8%ac%d8%af%d9%8a%d8%af%d8%a9-%d9%81%d9%8a-%d8%a7%d9%82%d8%aa%d8%b5%d8%a7%d8%af-%d8%a7%d9%84%d9%85%d8%ad%d8%aa%d9%88%d9%89-%d8%a7%d9%84%d8%b0%d9%83%d8%a7%d8%a1-%d8%a7%d9%84-2/', '', 1, NULL, NULL),
(67, 'هواوي تطلق سيارة كهربائية لمنافسة شاومي', '7 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/zmdXV-3Bypg-1-220x150.jpg', 'https://aitnews.com/2024/08/07/%d9%87%d9%88%d8%a7%d9%88%d9%8a-%d8%aa%d8%b7%d9%84%d9%82-%d8%b3%d9%8a%d8%a7%d8%b1%d8%a9-%d9%83%d9%87%d8%b1%d8%a8%d8%a7%d8%a6%d9%8a%d8%a9-%d9%84%d9%85%d9%86%d8%a7%d9%81%d8%b3%d8%a9-%d8%b4%d8%a7%d9%88-2/', '', 1, NULL, NULL),
(68, 'هواوي تعلن هاتفها القابل للطي Nova Flip', '6 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/nova-flip-iwpna8fW06I-220x150.jpg', 'https://aitnews.com/2024/08/06/%d9%87%d9%88%d8%a7%d9%88%d9%8a-%d8%aa%d8%b9%d9%84%d9%86-%d9%87%d8%a7%d8%aa%d9%81%d9%87%d8%a7-%d8%a7%d9%84%d9%82%d8%a7%d8%a8%d9%84-%d9%84%d9%84%d8%b7%d9%8a-nova-flip-2/', '', 1, NULL, NULL),
(69, 'السعودية تستثمر في مبرمجي الذكاء الاصطناعي', '5 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/HD_7uxmrz8A-220x150.jpg', 'https://aitnews.com/2024/08/05/%d8%a7%d9%84%d8%b3%d8%b9%d9%88%d8%af%d9%8a%d8%a9-%d8%aa%d8%b3%d8%aa%d8%ab%d9%85%d8%b1-%d9%81%d9%8a-%d9%85%d8%a8%d8%b1%d9%85%d8%ac%d9%8a-%d8%a7%d9%84%d8%b0%d9%83%d8%a7%d8%a1-%d8%a7%d9%84%d8%a7%d8%b5/', '', 1, NULL, NULL),
(70, 'هواوي تكشف عن MateBook GT14 .. وأمازون تعزز تقنية Just Walk Out', '4 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/matebook-gt14-just-walk-out-iD_FsWBNNgw-220x150.jpg', 'https://aitnews.com/2024/08/04/%d9%87%d9%88%d8%a7%d9%88%d9%8a-%d8%aa%d9%83%d8%b4%d9%81-%d8%b9%d9%86-matebook-gt14-%d9%88%d8%a3%d9%85%d8%a7%d8%b2%d9%88%d9%86-%d8%aa%d8%b9%d8%b2%d8%b2-%d8%aa%d9%82%d9%86%d9%8a%d8%a9-just-walk-out/', '', 1, NULL, NULL),
(71, 'كاوست تدعم ريادة السعودية في مجال الذكاء الاصطناعي التوليدي', '2 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/K8bIkQfNcpk-1-220x150.jpg', 'https://aitnews.com/2024/08/02/%d9%83%d8%a7%d9%88%d8%b3%d8%aa-%d8%aa%d8%af%d8%b9%d9%85-%d8%b1%d9%8a%d8%a7%d8%af%d8%a9-%d8%a7%d9%84%d8%b3%d8%b9%d9%88%d8%af%d9%8a%d8%a9-%d9%81%d9%8a-%d9%85%d8%ac%d8%a7%d9%84-%d8%a7%d9%84%d8%b0%d9%83/', '', 1, NULL, NULL),
(72, 'سدايا تعرض جهودها في توظيف الذكاء الاصطناعي', '1 أغسطس 2024', 'https://aitnews.com/wp-content/uploads/2024/08/Dgb43-DPewE-1-220x150.jpg', 'https://aitnews.com/2024/08/01/%d8%b3%d8%af%d8%a7%d9%8a%d8%a7-%d8%aa%d8%b9%d8%b1%d8%b6-%d8%ac%d9%87%d9%88%d8%af%d9%87%d8%a7-%d9%81%d9%8a-%d8%aa%d9%88%d8%b8%d9%8a%d9%81-%d8%a7%d9%84%d8%b0%d9%83%d8%a7%d8%a1-%d8%a7%d9%84%d8%a7%d8%b5/', '', 1, NULL, NULL),
(73, 'جوجل تجلب ميزة دائرة البحث إلى متصفح كروم', '31 يوليو 2024', 'https://aitnews.com/wp-content/uploads/2024/07/gQRLT6ITMgA-1-220x150.jpg', 'https://aitnews.com/2024/07/31/%d8%ac%d9%88%d8%ac%d9%84-%d8%aa%d8%ac%d9%84%d8%a8-%d9%85%d9%8a%d8%b2%d8%a9-%d8%af%d8%a7%d8%a6%d8%b1%d8%a9-%d8%a7%d9%84%d8%a8%d8%ad%d8%ab-%d8%a5%d9%84%d9%89-%d9%85%d8%aa%d8%b5%d9%81%d8%ad-%d9%83%d8%b1/', '', 1, NULL, NULL),
(74, 'آبل تطرح المجموعة الأولى من مزايا الذكاء الاصطناعي', '30 يوليو 2024', 'https://aitnews.com/wp-content/uploads/2024/07/ex3TXP79IUA-1-220x150.jpg', 'https://aitnews.com/2024/07/30/%d8%a2%d8%a8%d9%84-%d8%aa%d8%b7%d8%b1%d8%ad-%d8%a7%d9%84%d9%85%d8%ac%d9%85%d9%88%d8%b9%d8%a9-%d8%a7%d9%84%d8%a3%d9%88%d9%84%d9%89-%d9%85%d9%86-%d9%85%d8%b2%d8%a7%d9%8a%d8%a7-%d8%a7%d9%84%d8%b0%d9%83-2/', '', 1, NULL, NULL),
(75, 'OpenAI تستعد لإطلاق الوضع الصوتي في ChatGPT', '29 يوليو 2024', 'https://aitnews.com/wp-content/uploads/2024/07/openai-chatgpt-g24LT6Hx9_Y-2-220x150.jpg', 'https://aitnews.com/2024/07/29/openai-%d8%aa%d8%b3%d8%aa%d8%b9%d8%af-%d9%84%d8%a5%d8%b7%d9%84%d8%a7%d9%82-%d8%a7%d9%84%d9%88%d8%b6%d8%b9-%d8%a7%d9%84%d8%b5%d9%88%d8%aa%d9%8a-%d9%81%d9%8a-chatgpt-2/', '', 1, NULL, NULL),
(76, 'إضافات Gemini لتعزيز  إنتاجيتك في تطبيقات جوجل Workspace', '28 يوليو 2024', 'https://aitnews.com/wp-content/uploads/2024/07/gemini-workspace-rKNNgurvS_A-1-220x150.jpg', 'https://aitnews.com/2024/07/28/%d8%a5%d8%b6%d8%a7%d9%81%d8%a7%d8%aa-gemini-%d9%84%d8%aa%d8%b9%d8%b2%d9%8a%d8%b2-%d8%a5%d9%86%d8%aa%d8%a7%d8%ac%d9%8a%d8%aa%d9%83-%d9%81%d9%8a-%d8%aa%d8%b7%d8%a8%d9%8a%d9%82%d8%a7%d8%aa-%d8%ac%d9%88/', '', 1, NULL, NULL),
(77, 'أولمبياد باريس 2024.. شبكات الواي فاي العامة غير  آمنة', '27 يوليو 2024', 'https://aitnews.com/wp-content/uploads/2024/07/2024-N57XI2shbas-1-220x150.jpg', 'https://aitnews.com/2024/07/27/%d8%a3%d9%88%d9%84%d9%85%d8%a8%d9%8a%d8%a7%d8%af-%d8%a8%d8%a7%d8%b1%d9%8a%d8%b3-2024-%d8%b4%d8%a8%d9%83%d8%a7%d8%aa-%d8%a7%d9%84%d9%88%d8%a7%d9%8a-%d9%81%d8%a7%d9%8a-%d8%a7%d9%84%d8%b9%d8%a7%d9%85/', '', 1, NULL, NULL),
(78, 'تابع أولمبياد باريس 2024 عبر تطبيقات جوجل', '26 يوليو 2024', 'https://aitnews.com/wp-content/uploads/2024/07/2024-qO2jrL2reWk-1-220x150.jpg', 'https://aitnews.com/2024/07/26/%d8%aa%d8%a7%d8%a8%d8%b9-%d8%a3%d9%88%d9%84%d9%85%d8%a8%d9%8a%d8%a7%d8%af-%d8%a8%d8%a7%d8%b1%d9%8a%d8%b3-2024-%d8%b9%d8%a8%d8%b1-%d8%aa%d8%b7%d8%a8%d9%8a%d9%82%d8%a7%d8%aa-%d8%ac%d9%88%d8%ac%d9%84/', '', 1, NULL, NULL);

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;