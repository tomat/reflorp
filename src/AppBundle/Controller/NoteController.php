<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Board;
use AppBundle\Entity\Note;
use Doctrine\Common\Collections\Criteria;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class NoteController.
 */
class NoteController extends BaseController
{
    const NOTES_PER_PAGE = 6;

    /**
     * @ParamConverter()
     * 
     * @param Note $note
     *
     * @return Note
     */
    public function getNoteAction(Note $note)
    {
        return $note;
    }

    /**
     * @ParamConverter()
     * @QueryParam(name="page", requirements="\d+", default="1")
     *
     * @param Board                 $board
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Note[]
     */
    public function getBoardNotesAction(Board $board, ParamFetcherInterface $paramFetcher)
    {
        usleep(400000);

        return array_values(
            $board->getNotes()->matching(
                Criteria::create()->orderBy(['nr' => Criteria::ASC])
            )->slice(($paramFetcher->get('page') - 1) * self::NOTES_PER_PAGE, self::NOTES_PER_PAGE)
        );
    }

    /**
     * @ParamConverter()
     * @RequestParam(name="summary", requirements=".+")
     *
     * @param Board                 $board
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Note
     */
    public function postBoardNotesAction(Board $board, ParamFetcherInterface $paramFetcher)
    {
        usleep(400000);

        $note = new Note();
        $note->setBoard($board);
        $note->setSummary($paramFetcher->get('summary'));
        $note->setNr($board->getNotes()->count() + 1);

        $errors = $this->get('app.repository.helper')->validateAndPersist($note);
        if (count($errors) > 0) {
            return $this->createErrorResponse($errors);
        }

        $this->getDoctrine()->getManager()->flush();

        return $note;
    }

    /**
     * @ParamConverter()
     * @RequestParam(name="summary", requirements=".+")
     *
     * @param Board                 $board
     * @param Note                  $note
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Note
     */
    public function patchBoardNoteAction(Board $board, Note $note, ParamFetcherInterface $paramFetcher)
    {
        usleep(400000);

        assert($note->getBoard() === $board);

        $note->setSummary($paramFetcher->get('summary'));

        $errors = $this->get('app.repository.helper')->validateAndPersist($note);
        if (count($errors) > 0) {
            return $this->createErrorResponse($errors);
        }

        $this->getDoctrine()->getManager()->flush();

        return $note;
    }

    /**
     * @ParamConverter()
     *
     * @param Board                 $board
     * @param Note                  $note
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Response
     */
    public function deleteBoardNoteAction(Board $board, Note $note, ParamFetcherInterface $paramFetcher)
    {
        usleep(400000);

        assert($note->getBoard() === $board);

        $this->getDoctrine()->getManager()->remove($note);
        $this->getDoctrine()->getManager()->flush();

        return new Response('', Response::HTTP_NO_CONTENT);
    }
}
