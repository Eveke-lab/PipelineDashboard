<?php
namespace DashboardHub\Bundle\AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;

/**
 * This would go in its own Bundle
 *
 * Class DashboardApiController
 * @package DashboardHub\Bundle\AppBundle\Controller
 */
class DashboardApiController extends FOSRestController
{
    public function getDashboardAction($uid)
    {
        try {
            $dashboard = $this->get('dashboardhub_app_main.service.dashboard')
                              ->findOneByUidAndOwnedByUsernameOrIsPublic($uid);
        } catch (\InvalidArgumentException $e) {
            return $this->handleView(
                $this->view(new \stdClass(), 404)
            );
        }

        return $this->handleView(
            $this->view($dashboard, 200)
        );
    }
}