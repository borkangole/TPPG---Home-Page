-- Public-safe views for the website. Draft only. Confirm real table/column names
-- from the Portal schema before running. Expose ONLY what buyers should see:
-- no commissions, buyers, agent IDs, or internal notes.

-- create view public.public_properties as
--   select p.id, p.slug, p.name, d.name as developer_name, d.logo_url as developer_logo_url,
--          p.location, p.property_type, p.selling_status, p.image_url,
--          p.latitude, p.longitude,
--          min(u.tcp) filter (where u.status = 'Available') as starting_tcp,
--          count(u.*)  filter (where u.status = 'Available') as available_units
--   from properties p
--   join developers d on d.id = p.developer_id
--   left join units u on u.property_id = p.id
--   group by p.id, d.id;

-- create view public.public_units as
--   select id, property_id, unit_name, tcp, reservation_fee, full_downpayment,
--          downpayment_terms, monthly_dp, bedrooms, sqm, lot_type, furnishing,
--          construction_status, est_finish_date
--   from units
--   where status = 'Available';

-- grant select on public.public_properties, public.public_units to anon;
