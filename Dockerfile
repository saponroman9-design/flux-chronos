FROM python:3.12-slim

RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN git clone https://github.com/black-forest-labs/flux2 /app
RUN pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu && \
    pip install -e /app[all]

EXPOSE 8000
CMD ["python", "-m", "flux.api.server", "--host", "0.0.0.0", "--port", "8000"]
