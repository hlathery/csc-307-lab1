import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUsers(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person)
    });

    return promise;
  }

	function deleteUser(person) {
		const promise = fetch(`http://localhost:8000/users/${person.id}`, {
			method: "DELETE"
		});
		return promise;
	}

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
		deleteUser(characters[index])
			.then((res) => {
				if (res.status === 204) {
					setCharacters(updated)
				}
			})
			.catch((error) => {
				console.log(error);
			})
  }

  function updateList(person) {
    postUsers(person)
      .then((res) => {
        if (res.status === 201) {
					return res.json();
        } else {
          console.log("Unsucesfully created, status code:", res.status);
        }
      })
			.then((json) => {
				setCharacters((prev) => [...prev, json.added]);
			})
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
