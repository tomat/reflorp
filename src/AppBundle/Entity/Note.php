<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Note
 *
 * @ORM\Table(name="notes")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\NoteRepository")
 */
class Note
{
    /**
     * Possible values for the $status field.
     */
    const STATUS_TODO = 0;
    const STATUS_CLAIMED = 1;
    const STATUS_DONE = 2;

    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="nr", type="integer")
     */
    private $nr;

    /**
     * @var string
     *
     * @ORM\Column(name="summary", type="string", length=255)
     * @NotBlank()
     */
    private $summary;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var string
     *
     * @ORM\Column(name="assignee", type="string", length=255, nullable=true)
     */
    private $assignee;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="smallint")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="Board", inversedBy="notes")
     * @ORM\JoinColumn(name="board_id", referencedColumnName="id")
     *
     * @var Board
     */
    private $board;

    /**
     * Note constructor.
     */
    public function __construct()
    {
        $this->status = self::STATUS_TODO;
    }

    /**
     * Get id
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set summary
     *
     * @param string $summary
     *
     * @return Note
     */
    public function setSummary($summary)
    {
        $this->summary = $summary;

        return $this;
    }

    /**
     * Get summary
     *
     * @return string
     */
    public function getSummary()
    {
        return $this->summary;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Note
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set assignee
     *
     * @param string $assignee
     *
     * @return Note
     */
    public function setAssignee($assignee)
    {
        $this->assignee = $assignee;

        return $this;
    }

    /**
     * Get assignee
     *
     * @return string
     */
    public function getAssignee()
    {
        return $this->assignee;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Note
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return int
     */
    public function getNr()
    {
        return $this->nr;
    }

    /**
     * @param int $nr
     */
    public function setNr($nr)
    {
        $this->nr = $nr;
    }

    /**
     * Get status
     *
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return Board
     */
    public function getBoard()
    {
        return $this->board;
    }

    /**
     * @param Board $board
     */
    public function setBoard(Board $board)
    {
        $this->board = $board;
    }
}

