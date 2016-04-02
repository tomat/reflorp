<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160402235619 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE boards (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', title VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notes (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', board_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', summary VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, assignee VARCHAR(255) DEFAULT NULL, status SMALLINT NOT NULL, INDEX IDX_11BA68CE7EC5785 (board_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE notes ADD CONSTRAINT FK_11BA68CE7EC5785 FOREIGN KEY (board_id) REFERENCES boards (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE notes DROP FOREIGN KEY FK_11BA68CE7EC5785');
        $this->addSql('DROP TABLE boards');
        $this->addSql('DROP TABLE notes');
    }
}
