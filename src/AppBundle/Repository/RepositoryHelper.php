<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityManager;
use JMS\DiExtraBundle\Annotation\Inject;
use JMS\DiExtraBundle\Annotation\Service;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Service("app.repository.helper")
 */
class RepositoryHelper
{
    /**
     * @Inject("validator")
     *
     * @var ValidatorInterface
     */
    public $validator;

    /**
     * @Inject("doctrine.orm.entity_manager")
     *
     * @var EntityManager
     */
    public $em;

    /**
     * @param object $entity
     *
     * @return \Traversable|array list of errors
     */
    public function validateAndPersist($entity)
    {
        $errors = $this->validator->validate($entity);
        if (count($errors) > 0) {
            return $errors;
        }

        $this->em->persist($entity);

        return [];
    }
}
