export const generateKode = (data: any) => {
  const date: string = data['date'].replace('-', '').slice(2, -2)
  const resGenKode: number = data['resGenKode'] ?? 0
  const countGenKode: string = String(resGenKode + 1)
  const totalGenKode: string = countGenKode.padStart(6, '0')
  const genKode: string = '0' + data['id'] + date + totalGenKode
  return new Promise<string>((resolve) => resolve(genKode))
}
