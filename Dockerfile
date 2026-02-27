FROM python:3.12-slim
RUN pip install flux-klein[api]
CMD ["python", "-m", "flux.server", "--host", "0.0.0.0", "--port", "8000"]
