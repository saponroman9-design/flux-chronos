FROM ghcr.io/black-forest-labs/flux-klein:latest
EXPOSE 8000
CMD ["--host", "0.0.0.0", "--port", "8000"]
