<?php

namespace AppBundle\Twig\Extensions;

use JMS\DiExtraBundle\Annotation\Inject;
use JMS\DiExtraBundle\Annotation\Service;
use JMS\DiExtraBundle\Annotation\Tag;

/**
 * @Service("app.twig.extensions.file_modified")
 * @Tag("twig.extension")
 */
class FileModifiedExtension extends \Twig_Extension
{
    /**
     * @Inject("%kernel.root_dir%")
     */
    public $rootDir;

    /**
     * @return array
     */
    public function getFunctions()
    {
        return [
            'file_mtime' => new \Twig_Function_Method($this, 'fileMtime'),
        ];
    }

    /**
     * @param string $filePath
     *
     * @return string
     */
    public function fileMtime($filePath)
    {
        return filemtime($this->rootDir . '/../web/' . $filePath);
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'app_file_modified_extension';
    }
}
