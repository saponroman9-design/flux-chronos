# FLUX.2-klein-4B Railway Deployment

Self-hosted FLUX.2-klein-4B image generation on Railway with sub-second generation on consumer GPUs.

## Features

- **Model**: FLUX.2-klein-4B (4B parameters, Apache 2.0 commercial license)
- **Performance**: Sub-second generation on consumer GPUs
- **Platform**: Railway (first month $0)
- **Region**: eu-west (Amsterdam) for optimal latency

## Deployment

### Prerequisites
- Railway account
- Git repository with these files

### Quick Deploy

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Deploy FLUX.2-klein-4B"
   git push
   ```

2. **Deploy to Railway**
   ```bash
   railway up
   ```

3. **Get your URL**
   - Railway will provide a URL like `https://your-app.railway.app`
   - The API endpoint will be available at `/gen`

## API Usage

### Generate Image

```javascript
fetch('https://your-app.railway.app/gen', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    prompt: 'life sim scene' 
  })
})
.then(response => response.blob())
.then(blob => {
  // Handle image blob
  const imageUrl = URL.createObjectURL(blob);
  document.getElementById('image').src = imageUrl;
});
```

### Response
- Returns image blob (PNG/JPEG format)
- Content-Type: `image/jpeg` or `image/png`

## Configuration

### railway.toml
```toml
[build]
  dockerfilePath = "./Dockerfile"

[deploy]
  startCommand = "python -m flux_klein.server --host 0.0.0.0 --port $PORT"

[services]
  internalPort = 8000
  primaryRegion = "eu-west"
```

### Dockerfile
```dockerfile
FROM ghcr.io/black-forest-labs/flux-klein:latest
EXPOSE 8000
CMD ["--host", "0.0.0.0", "--port", "8000"]
```

## Cost

- **First month**: $0 (Railway free tier)
- **After**: ~$5-10/month depending on usage
- **Model**: Free (Apache 2.0 license)

## Performance

- **Model size**: 4B parameters
- **Generation time**: <1 second on consumer GPUs
- **Memory usage**: ~8GB VRAM
- **Resolution**: Up to 1024x1024

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check Dockerfile syntax
   - Verify railway.toml configuration

2. **Service not responding**
   - Check Railway logs
   - Verify port configuration (8000)

3. **Slow generation**
   - Check Railway GPU allocation
   - Consider upgrading to higher tier

### Logs
```bash
railway logs
```

## License

- FLUX.2-klein-4B: Apache 2.0 (Commercial use OK)
- This deployment setup: MIT
