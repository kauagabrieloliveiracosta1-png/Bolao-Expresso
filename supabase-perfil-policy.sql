-- Execute no SQL Editor do Supabase se o cadastro/login indicar que o perfil não foi salvo.
-- Permite que cada usuário autenticado crie somente o próprio perfil como participante.
DROP POLICY IF EXISTS "users insert own profile" ON public.profiles;
CREATE POLICY "users insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  id = auth.uid()
  AND role = 'participant'
);
