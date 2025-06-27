import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialQA = [
  { id: 1, question: "How do I reset my password?", answer: "Go to the login page, click 'Forgot Password', and follow the email instructions.", tags: ["login", "password"] },
];

export default function KnowledgeBasePrototype() {
  const [qas, setQAs] = useState(initialQA);
  const [query, setQuery] = useState('');
  const [newQA, setNewQA] = useState({ question: '', answer: '', tags: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const filteredQAs = qas.filter(q =>
    q.question.toLowerCase().includes(query.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const handleAddQA = () => {
    const tagsArray = newQA.tags.split(',').map(tag => tag.trim());
    setQAs([...qas, { ...newQA, tags: tagsArray, id: Date.now() }]);
    setNewQA({ question: '', answer: '', tags: '' });
  };

  const handleLogin = () => {
    if (username === 'Arun' && password === 'Arun') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!loggedIn) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="mb-2" />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="mb-4" />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Knowledge Base (Prototype)</h1>

      <Input
        placeholder="Search questions or tags..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="mb-6"
      />

      {filteredQAs.map(qa => (
        <Card key={qa.id} className="mb-4">
          <CardContent className="p-4">
            <h2 className="font-semibold text-lg">Q: {qa.question}</h2>
            <p className="mt-2">A: {qa.answer}</p>
            <p className="mt-2 text-sm text-muted">Tags: {qa.tags.join(', ')}</p>
          </CardContent>
        </Card>
      ))}

      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-2">Add New Q&A</h2>
        <Input
          placeholder="Question"
          value={newQA.question}
          onChange={e => setNewQA({ ...newQA, question: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Answer"
          value={newQA.answer}
          onChange={e => setNewQA({ ...newQA, answer: e.target.value })}
          className="mb-2"
        />
        <Input
          placeholder="Tags (comma separated)"
          value={newQA.tags}
          onChange={e => setNewQA({ ...newQA, tags: e.target.value })}
          className="mb-2"
        />
        <Button onClick={handleAddQA}>Add Q&A</Button>
      </div>
    </div>
  );
}
