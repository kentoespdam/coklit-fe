rsync -arP /mnt/d/html/coklit-fe/.next/standalone/ dev@192.168.1.214:/home/dev/docker/coklit-fe
rsync -arP /mnt/d/html/coklit-fe/.next/static dev@192.168.1.214:/home/dev/docker/coklit-fe/.next
rsync -arP /mnt/d/html/coklit-fe/.dockerignore dev@192.168.1.214:/home/dev/docker/coklit-fe/.dockerignore
rsync -arP /mnt/d/html/coklit-fe/Dockerfile dev@192.168.1.214:/home/dev/docker/coklit-fe/Dockerfile
rsync -arP /mnt/d/html/coklit-fe/docker-compose.yaml dev@192.168.1.214:/home/dev/docker/coklit-fe/docker-compose.yaml
