import React, { useState, useEffect, useRef } from 'react';
import './experience.css';
import { 
    SiMicrosoftazure, SiGooglecloud, SiMysql, SiPostgresql, SiSqlite, SiMongodb, 
    SiClickhouse, SiDbt, SiPython, SiDocker, 
    SiApacheairflow, SiKubernetes, SiApachekafka, SiGnubash, SiHtml5, SiCss3, 
    SiJavascript, SiBootstrap, SiTailwindcss, SiAngular, SiNextdotjs, SiReact, 
    SiNodedotjs, SiFlask, SiFirebase, SiPhp, SiTypescript, SiFastapi, SiApachespark
} from 'react-icons/si';
import { DiDatabase } from 'react-icons/di';
import { VscAzure } from 'react-icons/vsc';
import { GoGraph, GoGear } from 'react-icons/go';
import { FiSearch, FiCode, FiX, FiLayers, FiActivity } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    { id: 'overview', name: 'Overview & Insights', icon: <GoGraph size={18} /> },
    { id: 'cloud', name: 'Cloud & Infrastructure', icon: <VscAzure size={18} /> },
    { id: 'databases', name: 'Databases & Warehousing', icon: <DiDatabase size={18} /> },
    { id: 'dataeng', name: 'Data Engineering', icon: <GoGear size={18} /> },
    { id: 'frontend', name: 'Frontend Development', icon: <SiReact size={18} /> },
    { id: 'backend', name: 'Backend Development', icon: <SiNodedotjs size={18} /> }
];

const SKILLS_DATA = [
    // Cloud
    {
        id: 'azure',
        name: 'Azure',
        category: 'cloud',
        level: 'Experienced',
        icon: 'azure',
        color: '#0078d4',
        desc: 'Utilized for cloud data solutions, hosting services, identity management, and serverless compute functions. Deployed multiple pipelines and resources in commercial projects.',
        projects: 'Saturam, Portfolio Projects',
        code: `// Azure resource configuration snippet\n{\n  "type": "Microsoft.DataFactory/factories",\n  "apiVersion": "2018-06-01",\n  "name": "SaturamDataFactory",\n  "location": "eastus"\n}`
    },
    {
        id: 'gcp',
        name: 'GCP',
        category: 'cloud',
        level: 'Intermediate',
        icon: 'gcp',
        color: '#4285f4',
        desc: 'Google Cloud Platform usage focusing on serverless data querying via BigQuery, cloud storage buckets, and general application deployments.',
        projects: 'Personal Projects, Research',
        code: `from google.cloud import storage\n\ndef upload_blob(bucket_name, source_file_name, destination_blob_name):\n    """Uploads a file to the bucket."""\n    storage_client = storage.Client()\n    bucket = storage_client.bucket(bucket_name)\n    blob = bucket.blob(destination_blob_name)\n    blob.upload_from_filename(source_file_name)\n    print(f"File {source_file_name} uploaded to {destination_blob_name}.")`
    },
    // Databases
    {
        id: 'mysql',
        name: 'MySQL',
        category: 'databases',
        level: 'Experienced',
        icon: 'mysql',
        color: '#00758f',
        desc: 'Relational database schema designing, optimization of complex JOIN queries, indexing strategy implementation, and query profiling.',
        projects: 'Honeycomb Technologies, Saturam, E-Commerce Projects',
        code: `SELECT u.username, COUNT(o.id) as total_orders\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id\nWHERE o.created_at >= '2025-01-01'\nGROUP BY u.id\nHAVING total_orders > 5\nORDER BY total_orders DESC;`
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        category: 'databases',
        level: 'Experienced',
        icon: 'postgresql',
        color: '#336791',
        desc: 'Advanced relational database usage including window functions, triggers, JSONB data query optimization, and materialized view caching.',
        projects: 'Saturam, Analytics Platform',
        code: `SELECT \n  date_trunc('month', sale_date) AS month,\n  product_name,\n  revenue,\n  RANK() OVER (PARTITION BY date_trunc('month', sale_date) ORDER BY revenue DESC) as sales_rank\nFROM sales_data;`
    },
    {
        id: 'sqlite',
        name: 'SQLite',
        category: 'databases',
        level: 'Experienced',
        icon: 'sqlite',
        color: '#003b57',
        desc: 'Lightweight database solutions for testing environments, small-scale applications, mobile storage caches, and serverless architectures.',
        projects: 'Local Tools, CLI Scripts',
        code: `import sqlite3\n\nconn = sqlite3.connect('local_cache.db')\ncursor = conn.cursor()\ncursor.execute('''\n    CREATE TABLE IF NOT EXISTS cache (\n        key TEXT PRIMARY KEY,\n        value TEXT,\n        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    )\n''')`
    },
    {
        id: 'mongodb',
        name: 'MongoDB',
        category: 'databases',
        level: 'Intermediate',
        icon: 'mongodb',
        color: '#47a248',
        desc: 'NoSQL document storage design, building indexing models, and implementing complex aggregation pipelines for custom analytics reports.',
        projects: 'Honeycomb Technologies, Freelance Portals',
        code: `db.orders.aggregate([\n  { $match: { status: "A" } },\n  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },\n  { $sort: { total: -1 } }\n]);`
    },
    {
        id: 'bigquery',
        name: 'Google BigQuery',
        category: 'databases',
        level: 'Experienced',
        icon: 'bigquery',
        color: '#66a3ff',
        desc: 'Handling petabyte-scale data analytics, query optimization for cost reduction, partitioned tables setup, and dashboard backend streaming queries.',
        projects: 'Saturam, Analytics Warehousing',
        code: `CREATE OR REPLACE TABLE \`analytics.daily_summaries\`\nPARTITION BY date\nCLUSTER BY customer_id AS\nSELECT \n  DATE(timestamp) as date,\n  customer_id,\n  COUNT(1) as total_hits\nFROM \`raw_events.clicks\`\nGROUP BY 1, 2;`
    },
    {
        id: 'clickhouse',
        name: 'ClickHouse',
        category: 'databases',
        level: 'Intermediate',
        icon: 'clickhouse',
        color: '#fc0',
        desc: 'Ultra-fast analytical queries on massive columns, implementation of MergeTree engine, and processing logging telemetry.',
        projects: 'Telemetry Logging Tool',
        code: `CREATE TABLE web_logs (\n    event_date Date,\n    url String,\n    visitor_id UInt64,\n    duration UInt32\n)\nENGINE = MergeTree()\nPARTITION BY toYYYYMM(event_date)\nORDER BY (visitor_id, event_date);`
    },
    // Data Engineer
    {
        id: 'dbt',
        name: 'DBT',
        category: 'dataeng',
        level: 'Intermediate',
        icon: 'dbt',
        color: '#ff6b6b',
        desc: 'Data transformations in the warehouse using SQL. Modular model creation, documentation compilation, and schema testing in CI/CD pipeline.',
        projects: 'Saturam, Analytics Platform',
        code: `-- stg_orders.sql\nwith source as (\n    select * from {{ source('raw_store', 'orders') }}\n),\n\nrenamed as (\n    select\n        id as order_id,\n        customer_id,\n        order_date,\n        status\n    from source\n)\n\nselect * from renamed`
    },
    {
        id: 'python',
        name: 'Python',
        category: 'dataeng',
        level: 'Experienced',
        icon: 'python',
        color: '#3776ab',
        desc: 'Primary language for developing ETL scripts, orchestrating data pipelines, model building, scripting tasks, and backend API integration.',
        projects: 'Saturam, Honeycomb Technologies, Personal Tools',
        code: `import pandas as pd\nimport glob\n\ndef consolidate_csv_files(path_pattern):\n    files = glob.glob(path_pattern)\n    df_list = [pd.read_csv(f) for f in files]\n    combined_df = pd.concat(df_list, ignore_index=True)\n    return combined_df.clean_columns().drop_duplicates()`
    },
    {
        id: 'fabric',
        name: 'Microsoft Fabric',
        category: 'dataeng',
        level: 'Intermediate',
        icon: 'fabric',
        color: '#0078d4',
        desc: 'Next-generation all-in-one analytics platform. Building lakehouses, pipelines, dataflows, and implementing Spark notebooks for dynamic calculations.',
        projects: 'Saturam',
        code: `%%pyspark\n# Microsoft Fabric Notebook Execution\ndf = spark.read.table("SaturamLakehouse.RawSales")\ndisplay(df.groupBy("Category").count())`
    },
    {
        id: 'pyspark',
        name: 'PySpark',
        category: 'dataeng',
        level: 'Intermediate',
        icon: 'pyspark',
        color: '#e25a1c',
        desc: 'Distributed big data compute jobs. Cleaning large datasets, schema mapping, optimizing shuffles, and writing to Parquet/Delta file formats.',
        projects: 'Saturam, Data Analytics Job',
        code: `from pyspark.sql import SparkSession\nfrom pyspark.sql.functions import col, when\n\nspark = SparkSession.builder.appName("DataCleaning").getOrCreate()\ndf = spark.read.load("abfss://lakehouse@onelake.dfs.fabric.microsoft.com/Files/sales.parquet")\nclean_df = df.filter(col("amount") > 0).withColumn("status", when(col("qty") > 10, "Bulk").otherwise("Normal"))`
    },
    {
        id: 'adf',
        name: 'ADF',
        category: 'dataeng',
        level: 'Experienced',
        icon: 'adf',
        color: '#0078d4',
        desc: 'Azure Data Factory for workflow scheduling, building Copy Data tasks, executing notebooks, web activity calls, and dynamic folder mappings.',
        projects: 'Saturam',
        code: `// ADF Activity execution configuration snippet\n{\n  "name": "CopyRawToStaging",\n  "type": "Copy",\n  "inputs": [ { "referenceName": "BlobCsvDataset", "type": "DatasetReference" } ],\n  "outputs": [ { "referenceName": "SynapseTableDataset", "type": "DatasetReference" } ]\n}`
    },
    {
        id: 'synapse',
        name: 'Synapse',
        category: 'dataeng',
        level: 'Intermediate',
        icon: 'synapse',
        color: '#0078d4',
        desc: 'Azure Synapse Analytics workspaces. Combining serverless SQL pools for querying Parquet files directly from ADLS Gen2, and dedicated data warehouse pooling.',
        projects: 'Saturam',
        code: `-- Synapse serverless SQL pool querying\nSELECT TOP 100 *\nFROM OPENROWSET(\n    BULK 'https://saturamdatalake.dfs.core.windows.net/raw/sales/year=*/month=*/*.parquet',\n    FORMAT = 'PARQUET'\n) AS [result];`
    },
    {
        id: 'docker',
        name: 'Docker',
        category: 'dataeng',
        level: 'Intermediate',
        icon: 'docker',
        color: '#2496ed',
        desc: 'Containerizing developer environments, building multi-stage builds for APIs, orchestrating microservices with docker-compose.',
        projects: 'Saturam, Personal Deployments',
        code: `FROM python:3.9-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0"]`
    },
    {
        id: 'airflow',
        name: 'Airflow',
        category: 'dataeng',
        level: 'Basic',
        icon: 'airflow',
        color: '#017cee',
        desc: 'Apache Airflow for DAG structures. Managing schedule intervals, execution dependencies, dynamic task generations, and email notification webhooks.',
        projects: 'Saturam, Local Scheduler',
        code: `from airflow import DAG\nfrom airflow.operators.python import PythonOperator\nfrom datetime import datetime\n\ndef run_pipeline():\n    print("Extracting datasets...")\n\nwith DAG('daily_etl_sync', start_date=datetime(2025, 1, 1), schedule_interval='@daily', catchup=False) as dag:\n    task = PythonOperator(task_id='trigger_etl', python_callable=run_pipeline)`
    },
    {
        id: 'kubernetes',
        name: 'Kubernetes',
        category: 'dataeng',
        level: 'Experienced',
        icon: 'kubernetes',
        color: '#326ce5',
        desc: 'Deploying service deployments, managing configMaps, secrets, persistent volume claims, horizontal pod auto-scalers (HPA), and ingress load balancing.',
        projects: 'Cloud Orchestration Pipelines',
        code: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: fastapi-backend\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: fastapi\n  template:\n    metadata:\n      labels:\n        app: fastapi`
    },
    {
        id: 'deltalake',
        name: 'Delta Lake',
        category: 'dataeng',
        level: 'Basic',
        icon: 'deltalake',
        color: '#00a2ff',
        desc: 'Providing ACID transaction capabilities over object stores. Writing parquet data tables, vacuuming old logs, and utilizing time-travel version queries.',
        projects: 'Saturam',
        code: `# Writing streaming data into Delta lake format\ndf.write.format("delta") \\\n  .mode("overwrite") \\\n  .option("overwriteSchema", "true") \\\n  .save("/mnt/delta/sales_records")`
    },
    {
        id: 'kafka',
        name: 'Apache Kafka',
        category: 'dataeng',
        level: 'Experienced',
        icon: 'kafka',
        color: '#231f20',
        desc: 'Real-time event streams routing. Creating topics, partitions, writing custom producers, and designing resilient consumer group loops.',
        projects: 'Real-time Analytics Feed',
        code: `from kafka import KafkaConsumer\nimport json\n\nconsumer = KafkaConsumer(\n    'user-activities',\n    bootstrap_servers=['localhost:9092'],\n    value_deserializer=lambda m: json.loads(m.decode('utf-8'))\n)\nfor message in consumer:\n    print(f"Processing event: {message.value['event_type']}")`
    },
    {
        id: 'bash',
        name: 'Bash/Shell Scripting',
        category: 'dataeng',
        level: 'Experienced',
        icon: 'bash',
        color: '#4eaa25',
        desc: 'System maintenance scripting. Scheduling cron backups, log rotations, environment checks, and writing Docker container entrypoint scripts.',
        projects: 'All Linux Systems',
        code: `#!/bin/bash\n# Check if PostgreSQL container is running\nif [ "$(docker inspect -f '{{.State.Running}}' db_postgres 2>/dev/null)" = "true" ]; then\n    echo "DB is online. Starting backup..."\n    docker exec -t db_postgres pg_dumpall -c -U admin > backup.sql\nfi`
    },
    // Frontend Development
    {
        id: 'htmlcss',
        name: 'HTML/CSS',
        category: 'frontend',
        level: 'Experienced',
        icon: 'htmlcss',
        color: '#e34f26',
        desc: 'Semantic structure building and aesthetic layouts. Experience in grid, flexbox, custom themes, media queries, CSS variables, and modern transitions.',
        projects: 'All web interfaces',
        code: `.app-container {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 2rem;\n  border-radius: var(--border-radius-lg);\n  background: var(--color-bg-panel);\n}`
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        category: 'frontend',
        level: 'Experienced',
        icon: 'javascript',
        color: '#f7df1e',
        desc: 'Core functional programming, DOM manipulation, asynchronous architectures, event propagation, API integration with fetch, and ES6+ standards.',
        projects: 'Honeycomb Technologies, React/Angular apps',
        code: `const fetchUserData = async (userId) => {\n  try {\n    const res = await fetch(\`/api/v1/users/\${userId}\`);\n    if (!res.ok) throw new Error("Fetch failed");\n    return await res.json();\n  } catch (err) {\n    console.error("API error:", err.message);\n  }\n};`
    },
    {
        id: 'bootstrap_tailwind',
        name: 'Bootstrap/Tailwind',
        category: 'frontend',
        level: 'Experienced',
        icon: 'bootstrap_tailwind',
        color: '#38b2ac',
        desc: 'Rapid UI layouts. Tailwind utility-first styling for layouts, custom responsive themes, and Bootstrap layouts for corporate dashboard setups.',
        projects: 'Honeycomb Technologies, Admin Portals',
        code: `<div className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl">\n  <h3 className="text-xl font-bold text-white hover:text-orange-500 transition-colors">Workspace Title</h3>\n  <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium">Activate</button>\n</div>`
    },
    {
        id: 'angular',
        name: 'AngularJS',
        category: 'frontend',
        level: 'Intermediate',
        icon: 'angular',
        color: '#dd1b16',
        desc: 'Maintaining and updating component templates, controller structures, model bindings, and routing in enterprise legacy platforms.',
        projects: 'Honeycomb Technologies',
        code: `angular.module('invoiceApp', [])\n  .controller('InvoiceController', function InvoiceController($scope) {\n    $scope.qty = 1;\n    $scope.cost = 2.00;\n    $scope.total = function() {\n      return $scope.qty * $scope.cost;\n    };\n  });`
    },
    {
        id: 'nextjs',
        name: 'NextJS',
        category: 'frontend',
        level: 'Intermediate',
        icon: 'nextjs',
        color: '#ffffff',
        desc: 'Developing React apps with Server Side Rendering (SSR), Static Site Generation (SSG), routing with App Router, and optimizing image performance.',
        projects: 'Honeycomb Technologies, E-Commerce Projects',
        code: `// NextJS App Router Server Page\nexport async function generateStaticParams() {\n  const posts = await getPosts();\n  return posts.map((post) => ({\n    slug: post.slug,\n  }));\n}`
    },
    {
        id: 'react',
        name: 'React',
        category: 'frontend',
        level: 'Intermediate',
        icon: 'react',
        color: '#61dafb',
        desc: 'Functional components development, handling global state (Redux/Context), hooks (useEffect, useRef, useMemo), and GSAP integrations.',
        projects: 'Honeycomb Technologies, Portfolio Site',
        code: `import React, { useState, useEffect } from 'react';\n\nexport default function ClickCounter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    document.title = \`Click Count: \${count}\`;\n  }, [count]);\n  return <button onClick={() => setCount(c => c + 1)}>Clicked: {count}</button>;\n}`
    },
    // Backend Development
    {
        id: 'nodejs',
        name: 'Node JS',
        category: 'backend',
        level: 'Basic',
        icon: 'nodejs',
        color: '#339933',
        desc: 'Executing JavaScript servers. Custom file parsing, Express servers creation, middlewares authentication checks, and database connectors API routing.',
        projects: 'Honeycomb Technologies, Backend API',
        code: `const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.use(express.json());\napp.get('/health', (req, res) => res.status(200).json({ status: 'healthy' }));\napp.listen(PORT, () => console.log(\`Server listening on port \${PORT}\`));`
    },
    {
        id: 'flask',
        name: 'Flask-API',
        category: 'backend',
        level: 'Experienced',
        icon: 'flask',
        color: '#808080',
        desc: 'Python Flask development for microservices, endpoint security, payload validations, SQL Alchemy ORM connections, and JSON returns.',
        projects: 'Machine Learning Model Interfaces, Local Server',
        code: `from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\n@app.route('/api/predict', methods=['POST'])\ndef predict():\n    data = request.get_json()\n    val = data.get('value', 0)\n    return jsonify({"prediction": val * 1.5, "status": "success"})`
    },
    {
        id: 'firebase',
        name: 'Firebase',
        category: 'backend',
        level: 'Intermediate',
        icon: 'firebase',
        color: '#ffca28',
        desc: 'Using Firestore database storage, auth hooks, security rule settings, function triggers, and app analytics integrations.',
        projects: 'Honeycomb Technologies, Client Portals',
        code: `import { initializeApp } from "firebase/app";\nimport { getFirestore, collection, addDoc } from "firebase/firestore";\n\nconst app = initializeApp({ apiKey: "...", databaseURL: "..." });\nconst db = getFirestore(app);\nawait addDoc(collection(db, "logs"), { message: "System activated", time: Date.now() });`
    },
    {
        id: 'php',
        name: 'PHP',
        category: 'backend',
        level: 'Intermediate',
        icon: 'php',
        color: '#777bb4',
        desc: 'Building templates, backend database CRUD logic, managing custom session variables, and integrating third party payment SDKs.',
        projects: 'E-Commerce Admin Panel',
        code: `<?php\ntry {\n    $pdo = new PDO("mysql:host=localhost;dbname=shop", "user", "pass");\n    $stmt = $pdo->prepare("SELECT * FROM items WHERE category = :cat");\n    $stmt->execute(['cat' => $_GET['category']]);\n    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);\n} catch (PDOException $e) {\n    die("DB connection failed.");\n}`
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        category: 'backend',
        level: 'Intermediate',
        icon: 'typescript',
        color: '#3178c6',
        desc: 'Integrating static typing check layers to JavaScript codebases, designing interface models, type unions, and module exports verification.',
        projects: 'Admin Panel, Node Microservices',
        code: `interface DatabaseConfig {\n  host: string;\n  port: number;\n  ssl: boolean;\n}\n\nfunction connectDB(cfg: DatabaseConfig): void {\n  console.log(\`Connected to \${cfg.host}:\${cfg.port}\`);\n}`
    },
    {
        id: 'fastapi',
        name: 'FastAPI',
        category: 'backend',
        level: 'Experienced',
        icon: 'fastapi',
        color: '#009688',
        desc: 'Building high performance, production-ready REST APIs. Standardizing Swagger docs output automatically, Pydantic type safety, and async queries.',
        projects: 'Data Pipelines Sync, Backend APIs',
        code: `from fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass DataPayload(BaseModel):\n    metric_name: str\n    value: float\n\n@app.post("/metrics")\nasync def ingest_metric(payload: DataPayload):\n    return {"received": payload.metric_name, "status": "processed"}`
    }
];

const getIcon = (iconName, size = 24) => {
    switch (iconName) {
        case 'azure': return <SiMicrosoftazure size={size} />;
        case 'gcp': return <SiGooglecloud size={size} />;
        case 'mysql': return <SiMysql size={size} />;
        case 'postgresql': return <SiPostgresql size={size} />;
        case 'sqlite': return <SiSqlite size={size} />;
        case 'mongodb': return <SiMongodb size={size} />;
        case 'bigquery': return <SiGooglecloud size={size} />; // GCP Logo
        case 'clickhouse': return <SiClickhouse size={size} />;
        case 'dbt': return <SiDbt size={size} />;
        case 'python': return <SiPython size={size} />;
        case 'fabric': return <SiMicrosoftazure size={size} />;
        case 'pyspark': return <SiApachespark size={size} />;
        case 'adf': return <VscAzure size={size} />;
        case 'synapse': return <SiMicrosoftazure size={size} />;
        case 'docker': return <SiDocker size={size} />;
        case 'airflow': return <SiApacheairflow size={size} />;
        case 'kubernetes': return <SiKubernetes size={size} />;
        case 'deltalake': return <DiDatabase size={size} />;
        case 'kafka': return <SiApachekafka size={size} />;
        case 'bash': return <SiGnubash size={size} />;
        case 'htmlcss': return (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <SiHtml5 size={size} />
                <SiCss3 size={size} />
            </div>
        );
        case 'javascript': return <SiJavascript size={size} />;
        case 'bootstrap_tailwind': return (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <SiBootstrap size={size} />
                <SiTailwindcss size={size} />
            </div>
        );
        case 'angular': return <SiAngular size={size} />;
        case 'nextjs': return <SiNextdotjs size={size} />;
        case 'react': return <SiReact size={size} />;
        case 'nodejs': return <SiNodedotjs size={size} />;
        case 'flask': return <SiFlask size={size} />;
        case 'firebase': return <SiFirebase size={size} />;
        case 'php': return <SiPhp size={size} />;
        case 'typescript': return <SiTypescript size={size} />;
        case 'fastapi': return <SiFastapi size={size} />;
        default: return <DiDatabase size={size} />;
    }
};

const Experience = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [terminalLogs, setTerminalLogs] = useState([
        'Initializing developer workbench...',
        'Sync status: connected',
        'Loading database clusters...',
        'All pipelines online.'
    ]);
    const sectionRef = useRef(null);

    // Mock logs simulation for the dashboard overview
    useEffect(() => {
        if (activeTab !== 'overview') return;
        const logTemplates = [
            'Executing spark-submit script: clean_records.py',
            'ADF pipeline "SaturamETL" status: IN_PROGRESS',
            'DBT compilation complete: 18 tables verified',
            'Pushed updated artifacts to Google Container Registry',
            'ClickHouse: query completed in 0.004s (2.4M rows scanned)',
            'Connected to Azure ADLS Gen2 endpoint',
            'React production bundle build successful - dev bundle: 2.1MB',
            'FastAPI connection pool established: 12 active handlers',
            'Kafka partition 3: Rebalancing completed successfully',
            'ADF pipeline "SaturamETL" status: SUCCESS (duration: 3m 12s)'
        ];

        const interval = setInterval(() => {
            setTerminalLogs(prev => {
                const now = new Date().toLocaleTimeString();
                const randomMsg = logTemplates[Math.floor(Math.random() * logTemplates.length)];
                const newLogs = [...prev, `[${now}] ${randomMsg}`];
                if (newLogs.length > 8) newLogs.shift();
                return newLogs;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [activeTab]);

    // Animations with ScrollTrigger
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        
        gsap.fromTo(el.querySelector('.experience__window'),
            { opacity: 0, y: 80, scale: 0.98 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }, []);

    // Filter skills by search query and category
    const filteredSkills = SKILLS_DATA.filter(skill => {
        const matchesCategory = activeTab === 'overview' || skill.category === activeTab;
        const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const currentCategoryLabel = categories.find(cat => cat.id === activeTab)?.name || '';

    // Count skills by category for sidebar badges
    const getSkillCount = (catId) => {
        if (catId === 'overview') return SKILLS_DATA.length;
        return SKILLS_DATA.filter(s => s.category === catId).length;
    };

    return (
        <section id='experience' className='additional' ref={sectionRef}>
            <h5>What Skills I Have</h5>
            <h2>My Experience</h2>

            <div className="container experience__container_workbench">
                <div className="experience__window">
                    
                    {/* Mock OS / Application Header */}
                    <div className="experience__window-header">
                        <div className="window-controls">
                            <span className="control-dot close"></span>
                            <span className="control-dot minimize"></span>
                            <span className="control-dot expand"></span>
                        </div>
                        <div className="window-tab">
                            <FiLayers className="tab-icon" />
                            <span>skills_workspace.json</span>
                        </div>
                        <div className="window-path">
                            <span className="path-host">admin@saturam</span>
                            <span className="path-separator">:</span>
                            <span className="path-dir">~/workspace/experience</span>
                        </div>
                        <div className="window-status">
                            <span className="status-dot green"></span>
                            <span className="status-text">ONLINE</span>
                        </div>
                    </div>

                    <div className="experience__window-body">
                        
                        {/* Left Navigation Sidebar */}
                        <aside className="experience__sidebar">
                            <div>
                                <div className="sidebar-group-title">WORKSPACE</div>
                                <ul className="sidebar-menu">
                                    {categories.map(cat => (
                                        <li key={cat.id}>
                                            <button 
                                                className={`sidebar-item ${activeTab === cat.id ? 'active' : ''}`}
                                                onClick={() => {
                                                    setActiveTab(cat.id);
                                                    setSelectedSkill(null); // Clear selection on tab change
                                                }}
                                            >
                                                <span className="sidebar-item-icon">{cat.icon}</span>
                                                <span className="sidebar-item-name">{cat.name}</span>
                                                <span className="sidebar-item-badge">{getSkillCount(cat.id)}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="sidebar-system-stats">
                                <div className="sidebar-group-title">SYSTEM LOAD</div>
                                <div className="stat-progress-bar">
                                    <div className="progress-label">Data Engineering <span>94%</span></div>
                                    <div className="progress-track"><div className="progress-fill" style={{width: '94%'}}></div></div>
                                </div>
                                <div className="stat-progress-bar">
                                    <div className="progress-label">Full Stack <span>88%</span></div>
                                    <div className="progress-track"><div className="progress-fill" style={{width: '88%'}}></div></div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Work Area */}
                        <div className="experience__workspace">
                            
                            {activeTab === 'overview' ? (
                                /* OVERVIEW DASHBOARD VIEW */
                                <div className="workbench__dashboard">
                                    <div className="dashboard__header">
                                        <h3>Welcome to Developer Workbench</h3>
                                        <p>Overview of my technical expertise, software architectures, and automated pipelines.</p>
                                    </div>

                                    {/* Stats Cards */}
                                    <div className="dashboard__stats-grid">
                                        <div className="stat-card">
                                            <div className="stat-icon-wrapper orange"><FiActivity /></div>
                                            <div className="stat-info">
                                                <div className="stat-value">30+</div>
                                                <div className="stat-title">Skills Mastered</div>
                                            </div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-icon-wrapper green"><GoGear /></div>
                                            <div className="stat-info">
                                                <div className="stat-value">ETL & Data</div>
                                                <div className="stat-title">Azure & GCP Fabric</div>
                                            </div>
                                        </div>
                                        <div className="stat-card">
                                            <div className="stat-icon-wrapper blue"><FiLayers /></div>
                                            <div className="stat-info">
                                                <div className="stat-value">Full Stack</div>
                                                <div className="stat-title">NextJS, React, APIs</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chart and Terminal Stream Grid */}
                                    <div className="dashboard__charts-grid">
                                        {/* CSS chart distribution */}
                                        <div className="dashboard__panel distribution-panel">
                                            <h4>Domain Distribution</h4>
                                            <div className="distribution-bars">
                                                <div className="dist-item">
                                                    <div className="dist-header"><span>Data Engineering & Pipelines</span><span>40%</span></div>
                                                    <div className="dist-track"><div className="dist-fill" style={{width: '40%', background: '#ff7b00'}}></div></div>
                                                </div>
                                                <div className="dist-item">
                                                    <div className="dist-header"><span>Backend API & Services</span><span>25%</span></div>
                                                    <div className="dist-track"><div className="dist-fill" style={{width: '25%', background: '#ff9d42'}}></div></div>
                                                </div>
                                                <div className="dist-item">
                                                    <div className="dist-header"><span>Databases & Warehousing</span><span>20%</span></div>
                                                    <div className="dist-track"><div className="dist-fill" style={{width: '20%', background: '#ffbe85'}}></div></div>
                                                </div>
                                                <div className="dist-item">
                                                    <div className="dist-header"><span>Frontend Frameworks</span><span>15%</span></div>
                                                    <div className="dist-track"><div className="dist-fill" style={{width: '15%', background: '#ffffff'}}></div></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Real-time terminal log feed */}
                                        <div className="dashboard__panel terminal-panel">
                                            <div className="terminal-header">
                                                <div className="terminal-dot"></div>
                                                <span>live_build_logs.log</span>
                                            </div>
                                            <div className="terminal-body">
                                                {terminalLogs.map((log, index) => (
                                                    <div key={index} className="terminal-line">
                                                        <span className="terminal-prompt">$</span> {log}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* SKILLS LIST WITH FILTERING AND INSPECTOR */
                                <div className="workbench__skills-explorer">
                                    <div className="skills-explorer__header">
                                        <div className="explorer-title-wrapper">
                                            <h3>{currentCategoryLabel}</h3>
                                            <span>Showing {filteredSkills.length} items</span>
                                        </div>
                                        <div className="search-bar">
                                            <FiSearch className="search-icon" />
                                            <input 
                                                type="text" 
                                                placeholder={`Search inside ${currentCategoryLabel}...`}
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                            {searchQuery && (
                                                <button className="clear-search" onClick={() => setSearchQuery('')}>
                                                    <FiX />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Skills Grid and Detail Inspector Row */}
                                    <div className="skills-explorer__content">
                                        <div className={`skills-grid ${selectedSkill ? 'half-width' : ''}`}>
                                            {filteredSkills.map(skill => (
                                                <div 
                                                    key={skill.id} 
                                                    className={`skill-card ${selectedSkill?.id === skill.id ? 'active' : ''}`}
                                                    style={{ '--brand-color': skill.color }}
                                                    onClick={() => setSelectedSkill(skill)}
                                                >
                                                    <div className="skill-card-icon" style={{color: skill.color}}>
                                                        {getIcon(skill.icon, 24)}
                                                    </div>
                                                    <div className="skill-card-info">
                                                        <h4>{skill.name}</h4>
                                                        <span className="skill-level">{skill.level}</span>
                                                    </div>
                                                    <div className="skill-card-indicator" style={{background: skill.color}}></div>
                                                </div>
                                            ))}

                                            {filteredSkills.length === 0 && (
                                                <div className="no-skills-found">
                                                    <FiCode className="no-skills-icon" />
                                                    <p>No technologies matched your query.</p>
                                                    <button onClick={() => setSearchQuery('')} className="btn">Reset Search</button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Inspector Drawer */}
                                        {selectedSkill && (
                                            <div className="skill-inspector">
                                                <div className="inspector-header">
                                                    <div className="inspector-title">
                                                        <div className="icon-wrapper" style={{color: selectedSkill.color}}>
                                                            {getIcon(selectedSkill.icon, 28)}
                                                        </div>
                                                        <div>
                                                            <h4>{selectedSkill.name}</h4>
                                                            <span className="badge" style={{borderColor: selectedSkill.color, color: selectedSkill.color}}>
                                                                {selectedSkill.level}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button className="close-inspector" onClick={() => setSelectedSkill(null)}>
                                                        <FiX />
                                                    </button>
                                                </div>

                                                <div className="inspector-body">
                                                    <div className="inspector-section">
                                                        <h5>DESCRIPTION</h5>
                                                        <p>{selectedSkill.desc}</p>
                                                    </div>

                                                    <div className="inspector-section">
                                                        <h5>PROJECTS / ROLES</h5>
                                                        <p className="highlight-text">{selectedSkill.projects}</p>
                                                    </div>

                                                    <div className="inspector-section code-section">
                                                        <div className="code-header">
                                                            <FiCode className="code-icon" />
                                                            <span>sample_implementation.code</span>
                                                        </div>
                                                        <pre className="code-container">
                                                            <code>{selectedSkill.code}</code>
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;