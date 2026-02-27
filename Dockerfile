FROM public.ecr.aws/flux-klein:latest
EXPOSE 8000
CMD ["python", "-m", "flux_klein.server", "--host", "0.0.0.0", "--port", "8000"]
