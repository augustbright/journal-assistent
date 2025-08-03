import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Secrets } from '../atoms/secrets';

export class SecretsService {
  /**
   * Fetch secrets from Firestore
   * @param userId - The authenticated user's ID
   * @returns Promise<Secrets | null>
   */
  static async fetchSecrets(userId: string): Promise<Secrets | null> {
    try {
      const secretsDoc = doc(db, 'secrets', userId);
      const secretsSnapshot = await getDoc(secretsDoc);
      
      if (secretsSnapshot.exists()) {
        return secretsSnapshot.data() as Secrets;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching secrets:', error);
      throw error;
    }
  }

  /**
   * Fetch a specific secret value
   * @param userId - The authenticated user's ID
   * @param secretKey - The secret key (e.g., 'openai')
   * @param subKey - The sub-key (e.g., 'value')
   * @returns Promise<string | null>
   */
  static async fetchSecretValue(
    userId: string, 
    secretKey: string, 
    subKey: string = 'value'
  ): Promise<string | null> {
    try {
      const secrets = await this.fetchSecrets(userId);
      const secret = secrets?.[secretKey];
      return secret?.[subKey] || null;
    } catch (error) {
      console.error(`Error fetching secret ${secretKey}.${subKey}:`, error);
      throw error;
    }
  }
} 