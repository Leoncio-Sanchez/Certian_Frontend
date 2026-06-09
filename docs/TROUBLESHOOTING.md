# Solución de Problemas (Troubleshooting) - Certian

## Errores de Docker y Conflictos de Puertos

### 🚨 Error: `ports are not available: listen tcp 0.0.0.0:5000: bind`
**Mensaje completo:** 
`(HTTP code 500) server error - ports are not available: exposing port TCP 0.0.0.0:5000 -> 127.0.0.1:0: listen tcp 0.0.0.0:5000: bind: Solo se permite un uso de cada dirección de socket`

#### **¿Qué significa?**
Este error ocurre cuando intentas levantar un contenedor de Docker que quiere usar un puerto (en este caso el **5000**) que ya está siendo utilizado por otra aplicación o servicio en tu computadora. En Windows, esto es muy común si tienes otro backend corriendo o si un proceso "zombie" se quedó colgado.

#### **Cómo solucionarlo:**

1. **Identificar el proceso (Windows):**
   Abre una terminal (PowerShell o CMD) como administrador y ejecuta:
   ```powershell
   netstat -ano | findstr :5000
   ```
   Esto te dará el **PID** (número al final de la línea). Luego puedes matarlo con:
   ```powershell
   taskkill /F /PID <NÚMERO_PID>
   ```

2. **Cambiar el puerto en el proyecto:**
   Si necesitas mantener el otro servicio corriendo, debes cambiar el puerto en el archivo `docker-compose.yml`. 
   
   Ejemplo de cambio de 5000 a 5001:
   ```yaml
   backend:
     ports:
       - "5001:5000"  # Mapea el puerto 5001 de tu PC al 5000 del contenedor
   ```
   *Nota: Recuerda actualizar también la variable `NUXT_PUBLIC_API_URL` en el servicio del frontend dentro del mismo archivo.*

3. **Revisar servicios comunes que usan el puerto 5000:**
   - **AirPlay Receiver** (en macOS).
   - **Flask/Python apps**.
   - **Otros backends de Node.js**.

---

## Conflictos con PostgreSQL (Puerto 5432)

Si ya tienes una base de datos PostgreSQL instalada en tu máquina o corriendo en otro Docker, el puerto **5432** estará ocupado.

**Solución aplicada en este proyecto:**
Hemos mapeado el puerto externo a **5433** para evitar conflictos.
- **Puerto Host:** 5433 (Usa este en DBeaver)
- **Puerto Contenedor:** 5432

---

## Comandos Útiles de Limpieza
Si Docker se queda en un estado extraño después de un error de puertos:
```bash
docker-compose down      # Detiene y elimina contenedores
docker system prune -f   # Limpia caché de red y contenedores huérfanos
```
