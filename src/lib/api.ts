import { supabase } from './supabase'
import { Car, Reservation, Video, FAQ, Client, WhoWeAreData, SiteSettings } from './data'

// ==================== CARS ====================

export async function getCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching cars:', error)
    throw error
  }
  return data as Car[]
}

export async function getCar(id: number): Promise<Car | null> {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching car:', error)
    return null
  }
  return data as Car
}

export async function addCar(car: Omit<Car, 'id'>): Promise<Car> {
  console.log('Adding car:', car)

  const { data, error } = await supabase
    .from('cars')
    .insert([car])
    .select()
    .single()

  if (error) {
    console.error('Error adding car:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    throw error
  }

  console.log('Car added successfully:', data)
  return data as Car
}

export async function updateCar(id: number, updates: Partial<Car>): Promise<Car | null> {
  console.log('Updating car:', id, updates)

  // Remove undefined values
  const cleanUpdates = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== undefined)
  )

  const { data, error } = await supabase
    .from('cars')
    .update(cleanUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating car:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    console.error('Update data:', cleanUpdates)
    return null
  }

  console.log('Car updated successfully:', data)
  return data as Car
}

export async function deleteCar(id: number): Promise<boolean> {
  console.log('Deleting car:', id)

  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting car:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return false
  }

  console.log('Car deleted successfully')
  return true
}

// ==================== RESERVATIONS ====================

export async function getReservations(): Promise<Reservation[]> {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reservations:', error)
    throw error
  }

  // Convertir car_id a carId y created_at a createdAt para coincidir con la interfaz
  return data.map(reservation => ({
    ...reservation,
    carId: reservation.car_id,
    carName: reservation.car_name,
    customerName: reservation.customer_name,
    createdAt: reservation.created_at
  })) as Reservation[]
}

export async function getReservation(id: number): Promise<Reservation | null> {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching reservation:', error)
    return null
  }

  return {
    ...data,
    carId: data.car_id,
    carName: data.car_name,
    customerName: data.customer_name,
    createdAt: data.created_at
  } as Reservation
}

export async function addReservation(reservation: Omit<Reservation, 'id' | 'createdAt'>): Promise<Reservation> {
  // Convertir de camelCase a snake_case para la base de datos
  const dbReservation = {
    car_id: reservation.carId,
    car_name: reservation.carName,
    customer_name: reservation.customerName,
    email: reservation.email || 'no-email@cochereventa.com',
    phone: reservation.phone || 'Sin teléfono',
    method: reservation.method,
    date: reservation.date || null,
    time: reservation.time || null,
    message: reservation.message,
    status: reservation.status
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert([dbReservation])
    .select()
    .single()

  if (error) {
    console.error('Error adding reservation:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    throw error
  }

  return {
    ...data,
    carId: data.car_id,
    carName: data.car_name,
    customerName: data.customer_name,
    createdAt: data.created_at
  } as Reservation
}

export async function updateReservation(id: number, updates: Partial<Reservation>): Promise<Reservation | null> {
  // Convertir de camelCase a snake_case
  const dbUpdates: Record<string, unknown> = {}
  if (updates.carId !== undefined) dbUpdates.car_id = updates.carId
  if (updates.carName !== undefined) dbUpdates.car_name = updates.carName
  if (updates.customerName !== undefined) dbUpdates.customer_name = updates.customerName
  if (updates.email !== undefined) dbUpdates.email = updates.email
  if (updates.phone !== undefined) dbUpdates.phone = updates.phone
  if (updates.method !== undefined) dbUpdates.method = updates.method
  if (updates.date !== undefined) dbUpdates.date = updates.date
  if (updates.time !== undefined) dbUpdates.time = updates.time
  if (updates.message !== undefined) dbUpdates.message = updates.message
  if (updates.status !== undefined) dbUpdates.status = updates.status

  const { data, error } = await supabase
    .from('reservations')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating reservation:', error)
    return null
  }

  return {
    ...data,
    carId: data.car_id,
    carName: data.car_name,
    customerName: data.customer_name,
    createdAt: data.created_at
  } as Reservation
}

export async function deleteReservation(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting reservation:', error)
    return false
  }
  return true
}

// ==================== VIDEOS ====================

export async function getVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching videos:', error)
    throw error
  }
  return data as Video[]
}

export async function getVideo(id: number): Promise<Video | null> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching video:', error)
    return null
  }
  return data as Video
}

export async function addVideo(video: Omit<Video, 'id'>): Promise<Video> {
  const { data, error } = await supabase
    .from('videos')
    .insert([video])
    .select()
    .single()

  if (error) {
    console.error('Error adding video:', error)
    throw error
  }
  return data as Video
}

export async function updateVideo(id: number, updates: Partial<Video>): Promise<Video | null> {
  const { data, error } = await supabase
    .from('videos')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating video:', error)
    return null
  }
  return data as Video
}

export async function deleteVideo(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting video:', error)
    return false
  }
  return true
}

// ==================== FAQs ====================

export async function getFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching FAQs:', error)
    throw error
  }
  return data as FAQ[]
}

export async function getAllFAQs(): Promise<FAQ[]> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching all FAQs:', error)
    throw error
  }
  return data as FAQ[]
}

export async function getFAQ(id: number): Promise<FAQ | null> {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching FAQ:', error)
    return null
  }
  return data as FAQ
}

export async function addFAQ(faq: Omit<FAQ, 'id'>): Promise<FAQ> {
  const { data, error } = await supabase
    .from('faqs')
    .insert([faq])
    .select()
    .single()

  if (error) {
    console.error('Error adding FAQ:', error)
    throw error
  }
  return data as FAQ
}

export async function updateFAQ(id: number, updates: Partial<FAQ>): Promise<FAQ | null> {
  const { data, error } = await supabase
    .from('faqs')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating FAQ:', error)
    return null
  }
  return data as FAQ
}

export async function deleteFAQ(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting FAQ:', error)
    return false
  }
  return true
}

// ==================== CLIENTS ====================

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching clients:', error)
    throw error
  }

  // Convertir snake_case a camelCase
  return data.map(client => ({
    ...client,
    carBought: client.car_bought,
    completedAt: client.completed_at
  })) as Client[]
}

export async function getAllClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('order', { ascending: true })

  if (error) {
    console.error('Error fetching all clients:', error)
    throw error
  }

  return data.map(client => ({
    ...client,
    carBought: client.car_bought,
    completedAt: client.completed_at
  })) as Client[]
}

export async function getClient(id: number): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching client:', error)
    return null
  }

  return {
    ...data,
    carBought: data.car_bought,
    completedAt: data.completed_at
  } as Client
}

export async function addClient(client: Omit<Client, 'id'>): Promise<Client> {
  // Convertir camelCase a snake_case
  const dbClient = {
    name: client.name,
    testimonial: client.testimonial,
    rating: client.rating,
    avatar: client.avatar,
    location: client.location,
    car_bought: client.carBought,
    completed_at: client.completedAt,
    active: client.active,
    order: client.order
  }

  const { data, error } = await supabase
    .from('clients')
    .insert([dbClient])
    .select()
    .single()

  if (error) {
    console.error('Error adding client:', error)
    throw error
  }

  return {
    ...data,
    carBought: data.car_bought,
    completedAt: data.completed_at
  } as Client
}

export async function updateClient(id: number, updates: Partial<Client>): Promise<Client | null> {
  // Convertir camelCase a snake_case
  const dbUpdates: Record<string, unknown> = {}
  if (updates.name !== undefined) dbUpdates.name = updates.name
  if (updates.testimonial !== undefined) dbUpdates.testimonial = updates.testimonial
  if (updates.rating !== undefined) dbUpdates.rating = updates.rating
  if (updates.avatar !== undefined) dbUpdates.avatar = updates.avatar
  if (updates.location !== undefined) dbUpdates.location = updates.location
  if (updates.carBought !== undefined) dbUpdates.car_bought = updates.carBought
  if (updates.completedAt !== undefined) dbUpdates.completed_at = updates.completedAt
  if (updates.active !== undefined) dbUpdates.active = updates.active
  if (updates.order !== undefined) dbUpdates.order = updates.order

  const { data, error } = await supabase
    .from('clients')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating client:', error)
    return null
  }

  return {
    ...data,
    carBought: data.car_bought,
    completedAt: data.completed_at
  } as Client
}

export async function deleteClient(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting client:', error)
    return false
  }
  return true
}

// ==================== WHO WE ARE ====================

export async function getWhoWeAreData(): Promise<WhoWeAreData | null> {
  const { data, error } = await supabase
    .from('who_we_are')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Error fetching who we are data:', error)
    return null
  }
  return data as WhoWeAreData
}

export async function updateWhoWeAreData(updates: Partial<WhoWeAreData>): Promise<WhoWeAreData | null> {
  const { data, error } = await supabase
    .from('who_we_are')
    .update(updates)
    .eq('id', 1)
    .select()
    .single()

  if (error) {
    console.error('Error updating who we are data:', error)
    return null
  }
  return data as WhoWeAreData
}

// ==================== SITE SETTINGS ====================

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Error fetching site settings:', error)
    return null
  }

  // Convertir snake_case a camelCase
  return {
    companyName: data.company_name,
    companyLogo: data.company_logo,
    contactEmail: data.contact_email,
    contactPhone: data.contact_phone,
    contactAddress: data.contact_address,
    whatsappNumber: data.whatsapp_number,
    instagramUrl: data.instagram_url,
    facebookUrl: data.facebook_url,
    twitterUrl: data.twitter_url,
    linkedinUrl: data.linkedin_url,
    youtubeUrl: data.youtube_url,
    footerCopyright: data.footer_copyright,
    footerDescription: data.footer_description
  } as SiteSettings
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings | null> {
  // Convertir camelCase a snake_case
  const dbUpdates: Record<string, unknown> = {}
  if (updates.companyName !== undefined) dbUpdates.company_name = updates.companyName
  if (updates.companyLogo !== undefined) dbUpdates.company_logo = updates.companyLogo
  if (updates.contactEmail !== undefined) dbUpdates.contact_email = updates.contactEmail
  if (updates.contactPhone !== undefined) dbUpdates.contact_phone = updates.contactPhone
  if (updates.contactAddress !== undefined) dbUpdates.contact_address = updates.contactAddress
  if (updates.whatsappNumber !== undefined) dbUpdates.whatsapp_number = updates.whatsappNumber
  if (updates.instagramUrl !== undefined) dbUpdates.instagram_url = updates.instagramUrl
  if (updates.facebookUrl !== undefined) dbUpdates.facebook_url = updates.facebookUrl
  if (updates.twitterUrl !== undefined) dbUpdates.twitter_url = updates.twitterUrl
  if (updates.linkedinUrl !== undefined) dbUpdates.linkedin_url = updates.linkedinUrl
  if (updates.youtubeUrl !== undefined) dbUpdates.youtube_url = updates.youtubeUrl
  if (updates.footerCopyright !== undefined) dbUpdates.footer_copyright = updates.footerCopyright
  if (updates.footerDescription !== undefined) dbUpdates.footer_description = updates.footerDescription

  const { data, error } = await supabase
    .from('site_settings')
    .update(dbUpdates)
    .eq('id', 1)
    .select()
    .single()

  if (error) {
    console.error('Error updating site settings:', error)
    return null
  }

  return {
    companyName: data.company_name,
    companyLogo: data.company_logo,
    contactEmail: data.contact_email,
    contactPhone: data.contact_phone,
    contactAddress: data.contact_address,
    whatsappNumber: data.whatsapp_number,
    instagramUrl: data.instagram_url,
    facebookUrl: data.facebook_url,
    twitterUrl: data.twitter_url,
    linkedinUrl: data.linkedin_url,
    youtubeUrl: data.youtube_url,
    footerCopyright: data.footer_copyright,
    footerDescription: data.footer_description
  } as SiteSettings
}
