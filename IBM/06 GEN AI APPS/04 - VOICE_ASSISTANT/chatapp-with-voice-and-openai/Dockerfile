FROM python:3.10

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

# -----------------------------------------------------------------
# Copy certificates to make use of free open ai usage within the lab
# REMOVE THIS WHEN DEPLOYING TO CODE ENGINE

# Copy the self-signed root CA certificate into the container
COPY certs/rootCA.crt /usr/local/share/ca-certificates/rootCA.crt

# Update the CA trust store to trust the self-signed certificate
RUN chmod 644 /usr/local/share/ca-certificates/rootCA.crt && \
  update-ca-certificates

# Set the environment variable OPENAI_API_KEY to empty string
ENV OPENAI_API_KEY=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
ENV REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
# -----------------------------------------------------------------

CMD ["python", "-u", "server.py"]