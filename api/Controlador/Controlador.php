<?php

require_once('Modelo/Modelo.php');

class Controlador
{
    private $general_model;

    public function __construct(Modelo $generalModel)
    {
        $this->general_model = $generalModel;
    }

    public function POST($table, $data)
    {
        try {
            $stmt = $this->general_model->POST($table, $data);
            $this->respondWithJson($stmt);
        } catch (Exception $e) {
            $this->respondWithError($e->getMessage());
        }
    }

    public function GET($sql)
    {
        try {
            $stmt = $this->general_model->GET($sql);
            $this->respondWithJson($stmt);
        } catch (Exception $e) {
            $this->respondWithError($e->getMessage());
        }
    }

    public function PUT($table, $id, $data)
    {
        try {
            $stmt = $this->general_model->PUT($table, $id, $data);
            $this->respondWithJson($stmt);
        } catch (Exception $e) {
            $this->respondWithError($e->getMessage());
        }
    }

    public function DELETE($sql)
    {
        try {
            $stmt = $this->general_model->DELETE($sql);
            $this->respondWithJson($stmt);
        } catch (Exception $e) {
            $this->respondWithError($e->getMessage());
        }
    }

    private function respondWithJson($data)
    {
        header('Content-type: application/json;charset=utf-8');
        echo json_encode($data);
    }

    private function respondWithError($message)
    {
        $this->respondWithJson(['error' => $message]);
    }
}
