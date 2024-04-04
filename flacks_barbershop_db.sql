--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: detalles_productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalles_productos (
    id_detalle_producto integer NOT NULL,
    cantidad integer NOT NULL,
    total numeric NOT NULL,
    id_reservacion integer NOT NULL,
    id_producto integer NOT NULL
);


ALTER TABLE public.detalles_productos OWNER TO postgres;

--
-- Name: detalles_productos_id_detalle_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalles_productos_id_detalle_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.detalles_productos_id_detalle_producto_seq OWNER TO postgres;

--
-- Name: detalles_productos_id_detalle_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalles_productos_id_detalle_producto_seq OWNED BY public.detalles_productos.id_detalle_producto;


--
-- Name: mensajes_contacto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensajes_contacto (
    id_mensaje integer NOT NULL,
    asunto character varying(255) NOT NULL,
    mensaje character varying(255) NOT NULL,
    adjunto character varying(255),
    fecha_hora timestamp without time zone NOT NULL,
    id_cliente integer NOT NULL
);


ALTER TABLE public.mensajes_contacto OWNER TO postgres;

--
-- Name: mensajes_contacto_id_mensaje_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajes_contacto_id_mensaje_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mensajes_contacto_id_mensaje_seq OWNER TO postgres;

--
-- Name: mensajes_contacto_id_mensaje_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajes_contacto_id_mensaje_seq OWNED BY public.mensajes_contacto.id_mensaje;


--
-- Name: metodos_pago; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metodos_pago (
    id_metodo_pago integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.metodos_pago OWNER TO postgres;

--
-- Name: metodos_pago_id_metodo_pago_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metodos_pago_id_metodo_pago_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.metodos_pago_id_metodo_pago_seq OWNER TO postgres;

--
-- Name: metodos_pago_id_metodo_pago_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metodos_pago_id_metodo_pago_seq OWNED BY public.metodos_pago.id_metodo_pago;


--
-- Name: productos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    precio numeric NOT NULL,
    stock integer NOT NULL
);


ALTER TABLE public.productos OWNER TO postgres;

--
-- Name: productos_id_producto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.productos_id_producto_seq OWNER TO postgres;

--
-- Name: productos_id_producto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;


--
-- Name: resenas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resenas (
    id_resena integer NOT NULL,
    mensaje character varying(255),
    valoracion integer NOT NULL,
    fecha_hora timestamp without time zone NOT NULL,
    id_cliente integer NOT NULL,
    id_producto integer,
    id_servicio integer
);


ALTER TABLE public.resenas OWNER TO postgres;

--
-- Name: resenas_id_resena_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.resenas_id_resena_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.resenas_id_resena_seq OWNER TO postgres;

--
-- Name: resenas_id_resena_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.resenas_id_resena_seq OWNED BY public.resenas.id_resena;


--
-- Name: reservaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservaciones (
    id_reservacion integer NOT NULL,
    fecha date NOT NULL,
    hora time without time zone NOT NULL,
    activa boolean DEFAULT true NOT NULL,
    id_servicio integer,
    id_cliente integer,
    id_empleado integer
);


ALTER TABLE public.reservaciones OWNER TO postgres;

--
-- Name: reservaciones_id_reservacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservaciones_id_reservacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservaciones_id_reservacion_seq OWNER TO postgres;

--
-- Name: reservaciones_id_reservacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservaciones_id_reservacion_seq OWNED BY public.reservaciones.id_reservacion;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id_rol integer NOT NULL,
    nombre character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_rol_seq OWNER TO postgres;

--
-- Name: roles_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_rol_seq OWNED BY public.roles.id_rol;


--
-- Name: servicios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicios (
    id_servicio integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion character varying(255),
    precio numeric NOT NULL,
    duracion interval
);


ALTER TABLE public.servicios OWNER TO postgres;

--
-- Name: servicios_id_servicio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicios_id_servicio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.servicios_id_servicio_seq OWNER TO postgres;

--
-- Name: servicios_id_servicio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicios_id_servicio_seq OWNED BY public.servicios.id_servicio;


--
-- Name: tarjetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tarjetas (
    id_tarjeta integer NOT NULL,
    uid character varying(8) NOT NULL,
    id_cliente integer NOT NULL
);


ALTER TABLE public.tarjetas OWNER TO postgres;

--
-- Name: tarjetas_id_tarjeta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tarjetas_id_tarjeta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tarjetas_id_tarjeta_seq OWNER TO postgres;

--
-- Name: tarjetas_id_tarjeta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tarjetas_id_tarjeta_seq OWNED BY public.tarjetas.id_tarjeta;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id_ticket integer NOT NULL,
    fecha_hora_expedicion timestamp without time zone NOT NULL,
    monto_total numeric NOT NULL,
    fecha_hora_pago timestamp without time zone,
    monto_pagado numeric,
    cambio numeric,
    id_metodo_pago integer,
    id_empleado integer,
    id_reservacion integer NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: tickets_id_ticket_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tickets_id_ticket_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tickets_id_ticket_seq OWNER TO postgres;

--
-- Name: tickets_id_ticket_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tickets_id_ticket_seq OWNED BY public.tickets.id_ticket;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(50) NOT NULL,
    nombre character varying(50) NOT NULL,
    apellido_paterno character varying(50) NOT NULL,
    apellido_materno character varying(50),
    correo_electronico character varying(100) NOT NULL,
    "contraseña" character varying(255) NOT NULL,
    numero_telefono character varying(10) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: usuarios_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios_roles (
    id_usuario_rol integer NOT NULL,
    id_usuario integer NOT NULL,
    id_rol integer NOT NULL
);


ALTER TABLE public.usuarios_roles OWNER TO postgres;

--
-- Name: usuarios_roles_id_usuario_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_roles_id_usuario_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_roles_id_usuario_rol_seq OWNER TO postgres;

--
-- Name: usuarios_roles_id_usuario_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_roles_id_usuario_rol_seq OWNED BY public.usuarios_roles.id_usuario_rol;


--
-- Name: detalles_productos id_detalle_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_productos ALTER COLUMN id_detalle_producto SET DEFAULT nextval('public.detalles_productos_id_detalle_producto_seq'::regclass);


--
-- Name: mensajes_contacto id_mensaje; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes_contacto ALTER COLUMN id_mensaje SET DEFAULT nextval('public.mensajes_contacto_id_mensaje_seq'::regclass);


--
-- Name: metodos_pago id_metodo_pago; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodos_pago ALTER COLUMN id_metodo_pago SET DEFAULT nextval('public.metodos_pago_id_metodo_pago_seq'::regclass);


--
-- Name: productos id_producto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);


--
-- Name: resenas id_resena; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resenas ALTER COLUMN id_resena SET DEFAULT nextval('public.resenas_id_resena_seq'::regclass);


--
-- Name: reservaciones id_reservacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones ALTER COLUMN id_reservacion SET DEFAULT nextval('public.reservaciones_id_reservacion_seq'::regclass);


--
-- Name: roles id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_rol SET DEFAULT nextval('public.roles_id_rol_seq'::regclass);


--
-- Name: servicios id_servicio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios ALTER COLUMN id_servicio SET DEFAULT nextval('public.servicios_id_servicio_seq'::regclass);


--
-- Name: tarjetas id_tarjeta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarjetas ALTER COLUMN id_tarjeta SET DEFAULT nextval('public.tarjetas_id_tarjeta_seq'::regclass);


--
-- Name: tickets id_ticket; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id_ticket SET DEFAULT nextval('public.tickets_id_ticket_seq'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Name: usuarios_roles id_usuario_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_roles ALTER COLUMN id_usuario_rol SET DEFAULT nextval('public.usuarios_roles_id_usuario_rol_seq'::regclass);


--
-- Data for Name: detalles_productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.detalles_productos (id_detalle_producto, cantidad, total, id_reservacion, id_producto) FROM stdin;
1	1	10.00	1	1
2	2	16.00	1	2
3	4	48.00	2	3
\.


--
-- Data for Name: mensajes_contacto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensajes_contacto (id_mensaje, asunto, mensaje, adjunto, fecha_hora, id_cliente) FROM stdin;
1	Consulta sobre horarios	Quisiera saber si tienen disponibilidad para mañana por la tarde.	\N	2024-04-05 14:20:00	3
2	Reclamo por servicio	Tuve un inconveniente con el corte que me hicieron.	assets/img/reclamo.jpg	2024-04-06 17:30:00	2
3	Sugerencia para mejorar	Me gustaría que ampliaran la variedad de productos en venta.	\N	2024-04-07 12:10:00	3
\.


--
-- Data for Name: metodos_pago; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metodos_pago (id_metodo_pago, nombre) FROM stdin;
1	Efectivo
2	Terminal
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productos (id_producto, nombre, descripcion, precio, stock) FROM stdin;
1	Gel para cabello	Fijación fuerte	10.00	50
2	Champú	Para todo tipo de cabello	8.00	100
3	Cera para peinar	Brillo y control	12.00	30
\.


--
-- Data for Name: resenas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.resenas (id_resena, mensaje, valoracion, fecha_hora, id_cliente, id_producto, id_servicio) FROM stdin;
1	Excelente servicio, muy contento con mi corte.	5	2024-04-05 11:30:00	2	\N	1
2	El champú es genial, deja el cabello suave.	4	2024-04-06 16:45:00	3	\N	\N
3	La manicura fue rápida y bien hecha.	4	2024-04-07 15:15:00	3	\N	3
\.


--
-- Data for Name: reservaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservaciones (id_reservacion, fecha, hora, activa, id_servicio, id_cliente, id_empleado) FROM stdin;
1	2024-04-03	10:00:00	f	1	2	1
2	2024-04-06	15:30:00	t	3	3	1
3	2024-04-07	14:00:00	t	2	3	1
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id_rol, nombre) FROM stdin;
1	Administrador
2	Empleado
3	Cliente
\.


--
-- Data for Name: servicios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicios (id_servicio, nombre, descripcion, precio, duracion) FROM stdin;
1	Corte de cabello	Incluye lavado y secado	20.00	01:00:00
2	Afeitado	Con productos de alta calidad	15.00	00:45:00
3	Manicura	Cuidado de manos y uñas	10.00	00:30:00
\.


--
-- Data for Name: tarjetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tarjetas (id_tarjeta, uid, id_cliente) FROM stdin;
1	ABCD1234	2
2	EFGH5678	3
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id_ticket, fecha_hora_expedicion, monto_total, fecha_hora_pago, monto_pagado, cambio, id_metodo_pago, id_empleado, id_reservacion) FROM stdin;
1	2024-04-02 22:00:00	46.00	2024-04-03 10:00:00	50.00	4.00	1	1	1
2	2024-04-06 15:00:00	58.00	\N	\N	\N	\N	1	2
3	2024-04-07 13:45:00	15.00	\N	\N	\N	\N	1	3
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, nombre_usuario, nombre, apellido_paterno, apellido_materno, correo_electronico, "contraseña", numero_telefono) FROM stdin;
1	flacks	Michel Aldahir	Reyes	Salazar	aldahir.flacks@gmail.com	12345678	2718940012
2	cr1st1ansp	Jorge Christian	Serrano	Puertos	christiansp7231@gmail.com	12345678	2712667356
3	chuchito	Misrael	Florentino	Altamirano	misra.florentino@gmail.com	12345678	2718763906
\.


--
-- Data for Name: usuarios_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios_roles (id_usuario_rol, id_usuario, id_rol) FROM stdin;
1	1	1
2	1	2
3	2	3
4	3	3
\.


--
-- Name: detalles_productos_id_detalle_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.detalles_productos_id_detalle_producto_seq', 1, false);


--
-- Name: mensajes_contacto_id_mensaje_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensajes_contacto_id_mensaje_seq', 1, false);


--
-- Name: metodos_pago_id_metodo_pago_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metodos_pago_id_metodo_pago_seq', 1, false);


--
-- Name: productos_id_producto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.productos_id_producto_seq', 1, false);


--
-- Name: resenas_id_resena_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.resenas_id_resena_seq', 1, false);


--
-- Name: reservaciones_id_reservacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservaciones_id_reservacion_seq', 1, false);


--
-- Name: roles_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_rol_seq', 1, false);


--
-- Name: servicios_id_servicio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicios_id_servicio_seq', 1, false);


--
-- Name: tarjetas_id_tarjeta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tarjetas_id_tarjeta_seq', 1, false);


--
-- Name: tickets_id_ticket_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tickets_id_ticket_seq', 1, false);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 1, false);


--
-- Name: usuarios_roles_id_usuario_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_roles_id_usuario_rol_seq', 1, false);


--
-- Name: detalles_productos detalles_productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_productos
    ADD CONSTRAINT detalles_productos_pkey PRIMARY KEY (id_detalle_producto);


--
-- Name: mensajes_contacto mensajes_contacto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes_contacto
    ADD CONSTRAINT mensajes_contacto_pkey PRIMARY KEY (id_mensaje);


--
-- Name: metodos_pago metodos_pago_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodos_pago_nombre_key UNIQUE (nombre);


--
-- Name: metodos_pago metodos_pago_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodos_pago_pkey PRIMARY KEY (id_metodo_pago);


--
-- Name: productos productos_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_nombre_key UNIQUE (nombre);


--
-- Name: productos productos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);


--
-- Name: resenas resenas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resenas
    ADD CONSTRAINT resenas_pkey PRIMARY KEY (id_resena);


--
-- Name: reservaciones reservaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_pkey PRIMARY KEY (id_reservacion);


--
-- Name: roles roles_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_nombre_key UNIQUE (nombre);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_rol);


--
-- Name: servicios servicios_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_nombre_key UNIQUE (nombre);


--
-- Name: servicios servicios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicios
    ADD CONSTRAINT servicios_pkey PRIMARY KEY (id_servicio);


--
-- Name: tarjetas tarjetas_id_cliente_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarjetas
    ADD CONSTRAINT tarjetas_id_cliente_key UNIQUE (id_cliente);


--
-- Name: tarjetas tarjetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarjetas
    ADD CONSTRAINT tarjetas_pkey PRIMARY KEY (id_tarjeta);


--
-- Name: tarjetas tarjetas_uid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarjetas
    ADD CONSTRAINT tarjetas_uid_key UNIQUE (uid);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id_ticket);


--
-- Name: usuarios usuarios_correo_electronico_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_electronico_key UNIQUE (correo_electronico);


--
-- Name: usuarios usuarios_nombre_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_nombre_usuario_key UNIQUE (nombre_usuario);


--
-- Name: usuarios usuarios_numero_telefono_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_numero_telefono_key UNIQUE (numero_telefono);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- Name: usuarios_roles usuarios_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_pkey PRIMARY KEY (id_usuario_rol);


--
-- Name: detalles_productos detalles_productos_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_productos
    ADD CONSTRAINT detalles_productos_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: detalles_productos detalles_productos_id_reservacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalles_productos
    ADD CONSTRAINT detalles_productos_id_reservacion_fkey FOREIGN KEY (id_reservacion) REFERENCES public.reservaciones(id_reservacion);


--
-- Name: mensajes_contacto mensajes_contacto_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes_contacto
    ADD CONSTRAINT mensajes_contacto_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.usuarios(id_usuario);


--
-- Name: resenas resenas_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resenas
    ADD CONSTRAINT resenas_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.usuarios(id_usuario);


--
-- Name: resenas resenas_id_producto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resenas
    ADD CONSTRAINT resenas_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id_producto);


--
-- Name: resenas resenas_id_servicio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resenas
    ADD CONSTRAINT resenas_id_servicio_fkey FOREIGN KEY (id_servicio) REFERENCES public.servicios(id_servicio);


--
-- Name: reservaciones reservaciones_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.usuarios(id_usuario);


--
-- Name: reservaciones reservaciones_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.usuarios(id_usuario);


--
-- Name: reservaciones reservaciones_id_servicio_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_id_servicio_fkey FOREIGN KEY (id_servicio) REFERENCES public.servicios(id_servicio);


--
-- Name: tarjetas tarjetas_id_cliente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tarjetas
    ADD CONSTRAINT tarjetas_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.usuarios(id_usuario);


--
-- Name: tickets tickets_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.usuarios(id_usuario);


--
-- Name: tickets tickets_id_metodo_pago_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_id_metodo_pago_fkey FOREIGN KEY (id_metodo_pago) REFERENCES public.metodos_pago(id_metodo_pago);


--
-- Name: tickets tickets_id_reservacion_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_id_reservacion_fkey FOREIGN KEY (id_reservacion) REFERENCES public.reservaciones(id_reservacion);


--
-- Name: usuarios_roles usuarios_roles_id_rol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.roles(id_rol);


--
-- Name: usuarios_roles usuarios_roles_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios_roles
    ADD CONSTRAINT usuarios_roles_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- PostgreSQL database dump complete
--

