import { axiosGet } from "../services/apiRequests";

export const getAllSchemas = async() => {
    const details = {
        url: 'http://localhost:5000/schemas?orgId=2',
        config: {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJQQXN4LUIzZnBhaTZtVUVJaXFrNGFNUG5COWlQOV9vN1d6Z2JyVlZhYzdVIn0.eyJleHAiOjE2ODg3NzAwODMsImlhdCI6MTY4ODczNDA4NCwianRpIjoiNjE3ODA4MTgtZWJhZC00ZDkxLTkyYWMtZjE4NzU0MTA5ZDg3IiwiaXNzIjoiaHR0cDovLzAuMC4wLjA6ODA4OS9hdXRoL3JlYWxtcy9jcmVkZWJsLXBsYXRmb3JtIiwiYXVkIjpbImFkbWluLWZpZG90ZXN0dXNlckBnZXRuYWRhLmNvbSIsImFkbWluLXRlc3RzY2hlbWF1c2VyQHlvcG1haWwuY29tIiwiYWRtaW4td2VydHl1aW82N2U0ZUB5b3BtYWlsLmNvbSIsImFkbWluLWpvaG44OTg5QGdldG5hZGEuY29tIiwiYWRtaW4tYXNkYWZAeW9wbWFpbC5jb20iLCJhZG1pbi1maWRvdGVzdHVzZXJAeW9wbWFpbC5jb20iLCJhZG1pbi1zY2hlbWF1c2VyMDkwQHlvcG1haWwuY29tIiwiYWRtaW4tdGVzdHVzZXIxMjM0QHlvcG1haWwuY29tIiwiYWRtaW4tYXV0b2pAZ2V0bmFkYS5jb20iLCJhZG1pbi1maWRvdGVzdHVzZXJhYmNkQHlvcG1haWwuY29tIiwiYWRtaW4td2VydHl1aW90YXBwQHlvcG1haWwuY29tIiwiYWRtaW4tam9obnNtaXRoMDAxQHlvcG1haWwuY29tIiwiYWRtaW4tdGVzdHVzZXJ5QHlvcG1haWwuY29tIiwiYWRtaW4tam9obnNtaXRoQGdldG5hZGEuY29tIiwiYWRtaW4tdXNlcnRlc3Q4OUBnZXRuYWRhLmNvbSIsImFkbWluLXNjaGVtYWNyZWQxQHlvcG1haWwuY29tIiwiYWRtaW4tY3JlZHVzZXJAeW9wbWFpbC5jb20iLCJhZG1pbi12dnZiY2FAdm9tb3RvLmNvbSIsImFkbWluLXdlcnR5dWlvdHV5QHlvcG1haWwuY29tIiwiYWRtaW4tcXdlcnR5QHlvcG1haWwuY29tIiwiYWNjb3VudCIsImFkbWluLXNjaGVtYWNyZWRAeW9wbWFpbC5jb20iXSwic3ViIjoiYTljMWRlMTktMmY4OC00NWYwLWE2MGYtNzg4NDQ5OGUwY2ZkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW5DbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiYzVlZDIxMzctNTlhMy00MGJkLTkzNTMtODg2ZWJkMjdmZDYxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0OjMwMDAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhZG1pbi1maWRvdGVzdHVzZXJAZ2V0bmFkYS5jb20iOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LXByb2ZpbGUiXX0sImFkbWluLXRlc3RzY2hlbWF1c2VyQHlvcG1haWwuY29tIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19LCJhZG1pbi13ZXJ0eXVpbzY3ZTRlQHlvcG1haWwuY29tIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19LCJhZG1pbi1qb2huODk4OUBnZXRuYWRhLmNvbSI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfSwiYWRtaW4tYXNkYWZAeW9wbWFpbC5jb20iOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LXByb2ZpbGUiXX0sImFkbWluLWZpZG90ZXN0dXNlckB5b3BtYWlsLmNvbSI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfSwiYWRtaW4tc2NoZW1hdXNlcjA5MEB5b3BtYWlsLmNvbSI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfSwiYWRtaW4tdGVzdHVzZXIxMjM0QHlvcG1haWwuY29tIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19LCJhZG1pbi1hdXRvakBnZXRuYWRhLmNvbSI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfSwiYWRtaW4tZmlkb3Rlc3R1c2VyYWJjZEB5b3BtYWlsLmNvbSI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfSwiYWRtaW4td2VydHl1aW90YXBwQHlvcG1haWwuY29tIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19LCJhZG1pbi1qb2huc21pdGgwMDFAeW9wbWFpbC5jb20iOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LXByb2ZpbGUiXX0sImFkbWluLXRlc3R1c2VyeUB5b3BtYWlsLmNvbSI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfSwiYWRtaW4tam9obnNtaXRoQGdldG5hZGEuY29tIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19LCJhZG1pbi11c2VydGVzdDg5QGdldG5hZGEuY29tIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19LCJhZG1pbi1zY2hlbWFjcmVkMUB5b3BtYWlsLmNvbSI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfSwiYWRtaW4tY3JlZHVzZXJAeW9wbWFpbC5jb20iOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LXByb2ZpbGUiXX0sImFkbWluLXZ2dmJjYUB2b21vdG8uY29tIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19LCJhZG1pbi13ZXJ0eXVpb3R1eUB5b3BtYWlsLmNvbSI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfSwiYWRtaW4tcXdlcnR5QHlvcG1haWwuY29tIjp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sImFkbWluLXNjaGVtYWNyZWRAeW9wbWFpbC5jb20iOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6InF3ZXJ0eSBxd2VydHkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJxd2VydHlAeW9wbWFpbC5jb20iLCJnaXZlbl9uYW1lIjoicXdlcnR5IiwiZmFtaWx5X25hbWUiOiJxd2VydHkiLCJlbWFpbCI6InF3ZXJ0eUB5b3BtYWlsLmNvbSJ9.LCPLJ9rE72Q3zdV1a9IZEdLl0m1VZ11Vj_seeuYDDgnh4zfVhSSKYfmdVJcxsIzA5PvWouTbh8sh4z7w5TYmjO3Fi-bxbC17kJkdAo1Jhk-hLSdglNvZvXPkiL-dcSt1m3Lfrf2vmsywqKa36DbLcrIFaC0PdYpWqfPku_IazDh3jJ_Tu36sMLu0Murm7QqUoJp3TaiqdQ4L3mNvMg_2PY0-q-xx1dRKMqneBjJC6IlNHnjDiawN_OLk6Qokh2UBL1TxpryIi5VPEw6oSQbHl-RQ5viDfEgJ9liZMXPvBct4eIpq79qDPMjJXS3T_EyA8UmD1B96AZ0nGPZ6CUI1UA`,
          },
        },
      };
      
    try{
        const response = await axiosGet(details)
        return response
    }
    catch(error){
        const err = error as Error
        return err?.message
    }

   
}