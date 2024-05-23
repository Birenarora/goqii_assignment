<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function createUser(UserCreateRequest $request) {
        
        $data = $request->all();
        $data["dob"] = $data["date_of_birth"];

        $user = User::create($data);

        if (!$user) {
            return response()->json(["message" => "User not created.", "data" => null]);
        }

        return response()->json(["message" => "User created successfully.", "data" => $user]);
    }

    public function updateUser(UserUpdateRequest $request) {
        $data = $request->all();

        $userExists = User::find($data["id"]);

        if (!$userExists) {
            return response()->json(["message" => "User not found.", "data" => null]);
        }

        switch($data["action"]) {
            case "modifyUser":
                $userExists->name = $data["name"];
                $userExists->email = $data["email"];
                $userExists->password = $data["password"];
                $userExists->dob = $data["date_of_birth"];
                $user = $userExists->save();

                 if (!$user) {
                    return response()->json(["message" => "User not updated.", "data" => null]);
                 }
                $message = "User updated successfully.";
                $respData = $user;

                break;
            case "deleteUser":
                $user = $userExists->delete();

                if (!$user) {
                    return response()->json(["message" => "User not deleted.", "data" => null]);
                 }
                $message = "User deleted successfully.";
                $respData = null;

                break;
            default:
                break;
        }

        return response()->json(["message" => $message, "data" => $respData]);
    }

    public function getAllUsers() {
        
        $users = User::all();

        if (count($users) < 1) {
            return response()->json(["message" => "No Users found.", "data" => null]);
        }

        return response()->json(["message" => "All Users fetched successfully.", "data" => $users]);
    }
}
