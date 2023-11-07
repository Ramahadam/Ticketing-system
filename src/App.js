import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBug,
  faPlus,
  faCircleCheck,
  faEllipsis,
  faMagnifyingGlass,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function App() {
  const members = [];
  const [task, setTask] = useState([]);
  const [bug, setBug] = useState([]);

  const currentDisplayProject = task;

  function handleAddProject(project) {
    project.projectType === "task"
      ? setTask((oldTask) => [...oldTask, project])
      : setBug((oldBug) => [...oldBug, project]);
    console.log(task, bug);
  }

  return (
    <div className="app ">
      <Aside task={task} bug={bug} />
      <Main
        onAddProject={handleAddProject}
        currentDisplayProject={currentDisplayProject}
      />
    </div>
  );
}

function Main({ onAddProject, currentDisplayProject }) {
  const [showFormProject, setShowFormProject] = useState(false);
  const [showFormMemeber, setShowFormMember] = useState(false);

  function handelFormProject(e) {
    e.preventDefault();
    setShowFormProject(!showFormProject);
  }
  function handleFormMember(e) {
    e.preventDefault();
    setShowFormMember(!showFormMemeber);
  }

  return (
    <main className="col-span-5 pr-6 pt-4">
      <div className="actions">
        <button className="btn--primary" onClick={handelFormProject}>
          <FontAwesomeIcon icon={faPlus} />
          <span className="ml-2"> Create Project</span>
        </button>
        <button className="btn--seconday" onClick={handleFormMember}>
          <FontAwesomeIcon icon={faUser} />
          <span className="ml-2">Add Member </span>
        </button>
      </div>
      <DisplayProjects data={currentDisplayProject} />
      <FormAddProject
        onShowForm={handelFormProject}
        showForm={showFormProject}
        onAddProject={onAddProject}
      />
      <FormAddMemeber
        onShowForm={handleFormMember}
        showForm={showFormMemeber}
      />
    </main>
  );
}

function Aside({ task, bug }) {
  return (
    <aside>
      <div className="flex items-center justify-between  border-b-4 border-slate-50   ">
        <img
          src="./logo.png"
          className="logo font-semibold text-slate-50 w-full"
          alt="Brand logo"
        />
      </div>
      <ul className="px-4">
        <h2 className="font-medium mb-3 text-slate-800">Projects</h2>
        <button className="flex items-center gap-4 mb-2">
          <p>
            <FontAwesomeIcon icon={faCircleCheck} />
            <span className="ml-2">Tasks</span>
          </p>

          <span>{task.length}</span>
        </button>
        <button className="flex items-center gap-4 ">
          <p>
            <FontAwesomeIcon icon={faBug} />
            <span className="ml-2">Bugs</span>
          </p>

          <span>{bug.length}</span>
        </button>
      </ul>
      <ul className="px-4">
        <h2 className="font-medium mb-3 text-slate-800">Memebers</h2>
        <li className="flex items-center gap-2  mb-2">
          <img
            src="https://i.pravatar.cc"
            alt="member"
            className="rounded-full h-6"
          />
          <p className="font-semibold">Peter</p>
        </li>
        <li className="flex items-center gap-2 mb-2">
          <img
            src="https://i.pravatar.cc/48?u=499476"
            alt="member"
            className="rounded-full h-6"
          />
          <p className="font-semibold">Peter</p>
        </li>
      </ul>
    </aside>
  );
}

function FormAddProject({ onShowForm, showForm, onAddProject }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [projectType, setProjectType] = useState("task");
  const [member, setMember] = useState("");
  const prioritLevels = ["low", "normal", "high"];

  function handleSubmitForm(e) {
    e.preventDefault();

    if (!title.trim() && !description.trim()) return;

    const id = Date.now();

    const newProject = {
      id,
      title,
      description,
      priority,
      projectType,
      member,
      status: "Pending",
    };

    onAddProject(newProject);
  }

  return (
    showForm && (
      <form
        className=" absolute top-1/4 left-1/2 -translate-x-1/2"
        onSubmit={handleSubmitForm}
      >
        <h2 className="font-medium mb-3 text-slate-800">Add Project</h2>
        <button className="absolute top-2 right-2" onClick={onShowForm}>
          ❌
        </button>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {prioritLevels.map((priority) => (
                <option value={priority}>
                  {priority.slice(0, 1).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Type</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              {["task", "bug"].map((project) => (
                <option value={project}>
                  {project.slice(0, 1).toUpperCase() + project.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label>Assign</label>
            <select value={member} onChange={(e) => setMember(e.target.value)}>
              {["Peter", "John"].map((member) => (
                <option value={member}>{member}</option>
              ))}
            </select>
          </div>
        </div>
        <input type="submit" value="Add" className="btn--primary " />
      </form>
    )
  );
}

function FormAddMemeber({ onShowForm, showForm }) {
  const [memberName, setMemberName] = useState("");
  const [memberMail, setMemberMail] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/");
  const [job, setJob] = useState("front-end");

  function handleSubmitForm(e) {
    e.preventDefault();
  }
  return (
    showForm && (
      <form
        className=" absolute top-1/4 left-1/2 -translate-x-1/2"
        onSubmit={handleSubmitForm}
      >
        <h2 className="font-medium mb-3 text-slate-800">Add Member</h2>
        <button className="absolute top-2 right-2" onClick={onShowForm}>
          ❌
        </button>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <input
            type="email"
            placeholder="you@example.com "
            value={memberMail}
            onChange={(e) => setMemberMail(e.target.value)}
          />

          <input type="text" value={image} disabled />
          <select onChange={(e) => setJob(e.target.value)}>
            {["front-end", "backend", "designer"].map((job) => (
              <option value={job}>{job}</option>
            ))}
          </select>
        </div>
        <input type="submit" value="Add" className="btn--primary mt-4" />
      </form>
    )
  );
}

function DisplayProjects({ data }) {
  console.log(`data data`, data);
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">All tasks</h2>
      <div className="flex items-center gap-4 justify-between">
        <div className="filter my-3 text-sm">
          <select className="ring-1 ring-slate-300 focus:ring-sky-300 rounded-md p-1 mr-4">
            <option value="high">Filter by high</option>
            <option value="normal">Filter by normal</option>
            <option value="low">Filter by low</option>
          </select>
          <select className="ring-1 ring-slate-300 focus:ring-sky-300 rounded-md p-1 ">
            <option value="pending">Filter by pending</option>
            <option value="solved">Filter by solved</option>
            <option value="closed">Filter by complete</option>
          </select>
        </div>
        <form className="flex items-center p-1  ring-1 rounded-md text-sm gap-2">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-slate-400"
          />
          <input
            type="text"
            placeholder="Search for case"
            className="outline-none"
          />
        </form>
      </div>

      <table className="table-auto  border-t border-b w-full">
        <thead className="text-sm text-slate-600 bg-slate-100">
          <tr className="text-left border-b ">
            <th className="p-4">id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Assgin to</th>
            <th>Priority</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody className="text-sm text-slate-600">
          {data.map((data) => (
            <tr className="border-b">
              <td className="p-4">{data.id}</td>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td className="flex items-center gap-2 mb-2 mt-3">
                <img
                  src="https://i.pravatar.cc"
                  alt="member"
                  className="rounded-full h-6"
                />
                <p className="font-semibold">{data.member}</p>
              </td>
              <td>{data.priority}</td>
              <td>
                <span className="font-mono ring-1 ring-green-500 bg-green-100 text-green-600  rounded-full w-16  text-center block">
                  {data.status}
                </span>
              </td>
              <td>
                <button className="cursor-pointer">
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </td>
            </tr>
          ))}
          {/* <tr className="border-b">
              <td className="p-4">#1235</td>
              <td>Home page slow</td>
              <td>The home page is loading very slow</td>
              <td className="flex items-center gap-2 mb-2 mt-3">
                <img
                  src="https://i.pravatar.cc"
                  alt="member"
                  className="rounded-full h-6"
                />
                <p className="font-semibold">Peter</p>
              </td>
              <td>Low</td>
              <td>
                <span className="font-mono ring-1 ring-violet-500 bg-violet-100 text-violet-500  rounded-full  w-16 text-center block">
                  Pending
                </span>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4">#1235</td>
              <td>Service link issue</td>
              <td>Can't use the service link showing 404</td>
              <td className="flex items-center gap-2 mb-2 mt-3">
                <img
                  src="https://i.pravatar.cc"
                  alt="member"
                  className="rounded-full h-6"
                />
                <p className="font-semibold">Peter</p>
              </td>
              <td>High</td>
              <td>
                <span className="font-mono ring-1 ring-orange-500 bg-orange-100 text-orange-500  rounded-full w-16  text-center block">
                  Closed
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-4">#1235</td>
              <td>Contact page</td>
              <td>Build contact us page using tailiwndcss</td>
              <td className="flex items-center gap-2 mb-2 mt-3">
                <img
                  src="https://i.pravatar.cc"
                  alt="member"
                  className="rounded-full h-6"
                />
                <p className="font-semibold">Peter</p>
              </td>
              <td>Normal</td>
              <td>
                <span className="font-mono ring-1 ring-sky-500 bg-sky-100 text-sky-500  rounded-full w-16  text-center block">
                  Pending
                </span>
              </td>
            </tr> */}
        </tbody>
      </table>
    </div>
  );
}
