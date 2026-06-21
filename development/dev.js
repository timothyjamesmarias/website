const es = new EventSource('/stream');
es.onmessage = () => location.reload();
