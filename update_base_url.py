import os
import socket

# Initialize ip_address
ip_address = ""

# Function to check network connection
def is_connected():
    try:
        # Attempt to connect to a well-known address (Google DNS server)
        socket.create_connection(("8.8.8.8", 53), timeout=5)
        return True
    except OSError:
        return False

# Execute ipconfig and extract the IPv4 address if connected
if is_connected():
    ipconfig_output = os.popen("ipconfig").read()
    ip_lines = ipconfig_output.splitlines()
    for line in ip_lines:
        if "IPv4 Address" in line:
            ip_address = line.split(":")[1].strip()
            break
else:
    ip_address = ""

# If no IP address was found or network is not connected, set to localhost
if not ip_address:
    ip_address = "localhost"

# Read and update .env file
env_file_path = "./.env"
with open(env_file_path, "r") as env_file:
    env_lines = env_file.readlines()

for i, line in enumerate(env_lines):
    if line.startswith("VITE_REACT_APP_VITE_API_URL"):
        env_lines[i] = f'VITE_REACT_APP_VITE_API_URL=http://{ip_address}:5454\n'

with open(env_file_path, "w") as env_file:
    env_file.writelines(env_lines)

print(f"Base URL updated to http://{ip_address}:5454")
