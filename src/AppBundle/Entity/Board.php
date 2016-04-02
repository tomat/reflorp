<?php

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation\VirtualProperty;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Board
 *
 * @ORM\Table(name="boards")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\BoardRepository")
 */
class Board
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string")
     * @NotBlank()
     */
    private $title;

    /**
     * @ORM\OneToMany(targetEntity="Note", fetch="EXTRA_LAZY", mappedBy="board", cascade={"remove"})
     *
     * @var ArrayCollection|Note[]
     */
    private $notes;

    /**
     * Board constructor.
     */
    public function __construct()
    {
        $this->notes = new ArrayCollection();
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
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return Note[]|ArrayCollection
     */
    public function getNotes()
    {
        return $this->notes;
    }

    /**
     * @VirtualProperty()
     *
     * @return int
     */
    public function getNotesCount()
    {
        return $this->notes->count();
    }
}
