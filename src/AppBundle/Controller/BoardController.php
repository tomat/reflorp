<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Board;
use AppBundle\Entity\Note;
use FOS\RestBundle\Controller\Annotations\RequestParam;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Class BoardController.
 */
class BoardController extends BaseController
{
    /**
     * @ParamConverter()
     *
     * @param Board $board
     *
     * @return Board
     */
    public function getBoardAction(Board $board)
    {
        usleep(400);

        return $board;
    }

    /**
     * @RequestParam(name="title", requirements=".+")
     *
     * @param ParamFetcherInterface $paramFetcher
     *
     * @return Board
     */
    public function postBoardsAction(ParamFetcherInterface $paramFetcher)
    {
        usleep(400);

        $board = new Board();
        $board->setTitle($paramFetcher->get('title'));

        $errors = $this->get('app.repository.helper')->validateAndPersist($board);
        if (count($errors) > 0) {
            return $this->createErrorResponse($errors);
        }

        $this->getDoctrine()->getManager()->flush();

        return $board;
    }
}
