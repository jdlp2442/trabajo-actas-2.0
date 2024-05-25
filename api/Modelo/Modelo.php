<?php

//require_once("conexion.php");

class Modelo
{
    private $con;

    public function __construct(Database $database)
    {
        //$this->con = Connection::getInstance();
        $this->con = $database->getConnection();
    }

    public function GET($sql)
    {
        try {
            $stmt = $this->con->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    public function POST($table, $data)
    {
        try {
            $cols = implode(', ', array_keys($data));
            $vals = ':' . implode(', :', array_keys($data));
            $sql = "INSERT INTO $table ($cols) VALUES ($vals)";
            $stmt = $this->con->prepare($sql);

            foreach ($data as $key => $val) {
                $stmt->bindValue(":$key", $val);
            }
            $stmt->execute();

            return "Exito";
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function PUT($table, $id, $rows)
    {
        try {

            $setClause = implode(', ', array_map(function ($key) {
                return "$key = :$key";
            }, array_keys($rows)));

            if ($table == "user") {
                $sql = "UPDATE $table SET $setClause WHERE id = '$id'";

            } else if ($table == "register") {
                $sql = "UPDATE $table SET $setClause WHERE idregister = $id";

            }
            $stmt = $this->con->prepare($sql);

            foreach ($rows as $key => $val) {
                $stmt->bindValue(":$key", $val);
            }

            $stmt->execute();

            return "Exito!";
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function DELETE($sql)
    {
        try {
            $stmt = $this->con->prepare($sql);
            $stmt->execute();
            return "Exito!";
        } catch (PDOException $e) {
            return "Error: " . $e->getMessage();
        }
    }
}

