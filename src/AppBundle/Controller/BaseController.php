<?php

namespace AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\ConstraintViolationInterface;

/**
 * Class BaseController.
 */
class BaseController extends FOSRestController
{
    /**
     * @param \Traversable $errors
     *
     * @return \FOS\RestBundle\View\View
     */
    protected function createErrorResponse(\Traversable $errors)
    {
        $errorStrings = array_map(
            function (ConstraintViolationInterface $error) {
                return $error->getMessage();
            },
            iterator_to_array($errors)
        );

        return $this->view(
            [
                'error' => implode(', ', $errorStrings),
            ],
            Response::HTTP_BAD_REQUEST
        );
    }
}
