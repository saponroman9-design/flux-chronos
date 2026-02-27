FROM python:3.12-slim

RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu \
  && pip install flux-klein[api] transformers accelerate

EXPOSE 8000

CMD ["python", "-m", "flux.server", "--host", "0.0.0.0", "--port", "8000"]
