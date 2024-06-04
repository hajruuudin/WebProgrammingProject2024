<?php
ini_set("memory_limit", "1024M");

require __DIR__ . "/../vendor/autoload.php"; 
require_once __DIR__ . "/../rest/services/ItemsService.class.php";

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class StyleServer implements MessageComponentInterface {
    protected $server;
    protected $itemsService;

    public function __construct() {
        $this->server = IoServer::factory(
            new HttpServer(
                new WsServer($this)
            ),
            8080
        );
        echo "MAIN SERVER IS RUNNING\n"; 
        $this->server->run(); 
    }

    public function onOpen(ConnectionInterface $conn) {
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Received message {$msg} from {$from->resourceId}\n";

        $data = json_decode($msg, true);

        if ($data && isset($data['action'])) {
            switch ($data['action']) {
                case 'get_items':
                    if (isset($data['userId'])) {
                        $userId = $data['userId'];
                        $this->initializeItemsService(); 
                        $items = $this->itemsService->get_items($userId);
                        $response = json_encode($items);
                        $from->send($response);
                        echo "Sending items to user {$userId}\n";
                    } else {
                        $from->send(json_encode(["error" => "userId not provided"]));
                    }
                    break;
                case 'add_item':
                    break;
                default:
                    $from->send(json_encode(["error" => "Unknown action"]));
            }
        } else {
            $from->send(json_encode(["error" => "Invalid message format"]));
        }
    }

    public function onClose(ConnectionInterface $conn) {
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
    }

    protected function initializeItemsService() {
        if (!$this->itemsService) {
            $this->itemsService = new ItemsService();
        }
    }
}

$styleServer = new StyleServer();
